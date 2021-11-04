let Stringifier = require('postcss/lib/stringifier')

class HublStringifier extends Stringifier {

  stringify(node, semicolon) {
    /* istanbul ignore if */
    if (!this[node.type]) {
      throw new Error(
        'Unknown AST node type ' +
        node.type +
        '. ' +
        'Maybe you need to change PostCSS stringifier.'
      )
    }
    this[node.type](node, semicolon)
  }

  comment(node) {
    if (node.raws.hubl == true) {
      let left = this.raw(node, 'left', 'comentLeft')
      let right = this.raw(node, 'right', 'commentRight')
      this.builder(left + node.text + right, node)
    } else {
      let left = this.raw(node, 'left', 'commentLeft')
      let right = this.raw(node, 'right', 'commentRight')
      this.builder('/*' + left + node.text + right + '*/', node)
    }
  }



}

module.exports = HublStringifier