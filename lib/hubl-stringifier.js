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
    let left = this.raw(node, 'left', 'commentLeft')
    let right = this.raw(node, 'right', 'commentRight')
    this.builder('/*' + left + node.text + right + '*/', node)
  }



}

module.exports = HublStringifier