import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Webpack',
  base: '/notebook-webpack',
  publicPath: '/notebook-webpack/',
  favicon: 'https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/webpack.svg',
  logo: 'https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/webpack.svg',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config
});
