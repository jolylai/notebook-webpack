import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Webpack',
  description: 'Webpack 学习笔记',
  lastUpdated: true,
  themeConfig: {
    nav: [
      {
        text: '指引',
        link: '/guide/getting-start',
        activeMatch: '^/guide/',
      },
    ],
    sidebar: {
      '/guide/': getSidebar(),
    },
  },
  markdown: {
    lineNumbers: false,
  },
});

function getSidebar() {
  return [
    {
      text: '指引',
      items: [
        { text: '快速开始', link: '/guide/getting-start' },
        { text: 'loader', link: '/guide/loader' },
      ],
    },
  ];
}
