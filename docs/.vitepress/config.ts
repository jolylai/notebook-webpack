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
    lineNumbers: true,
  },
});

function getSidebar() {
  return [
    {
      text: '指引',
      items: [
        { text: '快速开始', link: '/guide/getting-start' },
        { text: 'loader', link: '/guide/loader' },
        { text: 'Vue Cli', link: '/guide/vue-cli' },
      ],
    },
    {
      text: '资源管理',
      items: [
        { text: 'CSS', link: '/guide/asset-management/css' },
        // { text: 'Vue Cli', link: '/guide/vue-cli' },
      ],
    },
    // {
    //   text: 'Babel',
    //   items: [{ text: 'loader', link: '/guide/babel/index' }],
    // },
  ];
}
