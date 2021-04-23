module.exports = function tplLoader(content) {
  return `
    export default function tpl(tplObj){
      ${tplReplace.toString()}
      return tplReplace(${content}, tplObj)
    }
  `;
};

function tplReplace(content, tplObj) {
  console.log({ content, tplObj });
  return content.replace(/\{\{(.*?)\}\}/, (node, key) => {
    return tplObj[key];
  });
}
