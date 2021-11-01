let Stringifier = require('postcss/lib/stringifier')

class HublStringifier extends Stringifier {

  // hubl(node) {
  //   console.log("HUBL FIRE STRING start _-_---------------")
  //   console.log(node);
  //   let left = this.raw(node, 'left', 'commentLeft')
  //   let right = this.raw(node, 'right', 'commentRight')
  //   this.builder(node.text, node)
  //   console.log(this.builder(node.text, node));
  //   console.log("HUBL FIRE STRING END _-_---------------")
  // }
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
    console.log('Hubl Stringify Running');
    this[node.type](node, semicolon)
  }

  comment(node) {
    if (node.raws.hubl == true) {
      console.log("HUBL FIRE STRING start _-_---------------")
      // console.log(node);
      let left = this.raw(node, 'left', 'comentLeft')
      let right = this.raw(node, 'right', 'commentRight')
      this.builder(left + node.text + right, node)
      console.log("HUBL FIRE STRING END _-_---------------")
    } else {
      console.log('ELSE RUNNING DAWG _________________')
      let left = this.raw(node, 'left', 'commentLeft')
      let right = this.raw(node, 'right', 'commentRight')
      this.builder('/*' + left + node.text + right + '*/', node)
    }
  }



}

module.exports = HublStringifier