import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Искусство Ремонта",
  description: "Бизнес-портал и план развития проекта",
  base: '/art-remont-docs/', // Важно для поддомена!
  themeConfig: {
    nav: [
      { text: 'Главная', link: '/' },
      { text: 'План развития', link: '/strategy/пошаговый_план' }
    ],

    sidebar: [
      {
        text: '📌 Стратегия и План',
        items: [
          { text: 'Пошаговый план развития', link: '/strategy/пошаговый_план' },
          { text: 'Маркетинговый Канбан (Задачи)', link: '/marketing/маркетинговый_канбан' }
        ]
      },
      {
        text: '🎯 Маркетинг и Продажи',
        items: [
          { text: 'Аудитория, Оффер и Продажи', link: '/marketing/аудитория_и_продажи' }
        ]
      },
      {
        text: '📈 Аналитика и Реклама',
        items: [
          { text: 'Как мы отслеживаем результат', link: '/analytics/аналитика_и_реклама' },
          { text: 'Анализ конкурентов в Сочи', link: '/seo/Топ_сайтов_Сочи' },
          { text: 'Выбор домена для сайта', link: '/seo/Сравнение_доменов_RU_vs_РФ' }
        ]
      }
    ]
  }
})
