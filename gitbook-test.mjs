import { GitBookAPI } from '@gitbook/api';
import fs from 'fs';

const organizationId = "LZczXqGSYofJh1NIOB4I";
const siteId = "site_bpCTp";
const token = 'gb_api_poYcYbgBc8M5Jq09IPGQuv4W3Ym0cgbNRYTqatUl';

const client = new GitBookAPI({ authToken: token });

// Рекурсивная функция для извлечения текста из внутреннего формата GitBook (Slate.js)
function extractText(node) {
  if (!node) return "";
  let text = "";
  
  // Если это текстовый узел, текст лежит внутри массива leaves
  if (node.object === 'text' && Array.isArray(node.leaves)) {
    for (const leaf of node.leaves) {
      if (typeof leaf.text === 'string') {
        text += leaf.text;
      }
    }
  } 
  // Если есть дочерние узлы (блоки, списки)
  else if (Array.isArray(node.nodes)) {
    for (const child of node.nodes) {
      const childText = extractText(child);
      text += childText;
      
      // Форматируем переносы строк для красоты
      if (child.object === 'block') {
        if (child.type === 'list-item') {
          text += '\n'; // Элемент списка с новой строки
        } else if (child.type === 'paragraph' || child.type?.startsWith('heading')) {
          text += '\n\n'; // Абзацы разделяем двойным переносом
        }
      }
    }
  }
  return text;
}

async function askLens(question, retries = 3) {
  console.log(`\nЗапрашиваем ответ у GitBook AI Lens на вопрос: "${question}"...`);
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    let lastValidText = "";
    
    try {
      const stream = await client.orgs.streamAskInSite(organizationId, siteId, {
        question: question,
        scope: { mode: 'default' }
      });

      for await (const event of stream) {
        if (event.type === 'answer' && event.answer?.answer?.document) {
          const currentText = extractText(event.answer.answer.document);
          
          process.stdout.write('\x1Bc'); // Очищаем консоль для эффекта перерисовки
          console.log("🤖 GitBook Lens отвечает:\n");
          console.log(currentText.trim());
          
          lastValidText = currentText;
        }
      }
      
      console.log("\n\n✅ Ответ полностью получен.");
      return; 
      
    } catch (error) {
      console.error(`\n\n❌ Ошибка на попытке ${attempt}/${retries}:`, error.message);
      
      if (lastValidText) {
        console.log("\n⚠️ Успели получить часть текста до обрыва:");
        console.log("-----------------------------------------");
        console.log(lastValidText.trim());
        console.log("-----------------------------------------");
      }
      
      if (attempt < retries) {
        console.log("Ждем 3 секунды перед повторной попыткой...");
        await new Promise(resolve => setTimeout(resolve, 3000));
      } else {
        console.log("❌ Все попытки исчерпаны. Соединение нестабильно.");
      }
    }
  }
}

await askLens('Как начать работу с проектом?');
