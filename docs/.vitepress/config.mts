import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Искусство Ремонта",
  description: "База знаний и аналитика проекта",
  base: '/art-remont-docs/', // Важно для поддомена!
  themeConfig: {
    nav: [
      { text: 'Главная', link: '/' },
      { text: 'SEO и Выдача', link: '/seo/Топ_сайтов_Сочи' }
    ],

    sidebar: [
      {
        text: 'Аналитика',
        items: [
          { text: 'Топ сайтов Сочи', link: '/seo/Топ_сайтов_Сочи' }
        ]
      }
    ]
  }
})
