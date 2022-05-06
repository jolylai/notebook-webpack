module.exports = function webpackLoader(content, map, meta) {
  console.log('content, map, meta: ', { content, map, meta });
  // code of your webpack loader

  return content;
};
module.exports.raw = true;
