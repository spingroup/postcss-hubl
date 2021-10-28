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

  comment(node) {
    if (node.raws.hubl == true) {
      console.log("HUBL FIRE STRING start _-_---------------")
      console.log(node);
      let left = this.raw(node, 'left', 'commentLeft')
      let right = this.raw(node, 'right', 'commentRight')
      this.builder(left + node.text + right, node)
      console.log("HUBL FIRE STRING END _-_---------------")
    } else {
      console.log('ELSE RUNNING DAWG _________________')
      let left = this.raw(node, 'left', 'commentLeft')
      let right = this.raw(node, 'right', 'commentRight')
      this.builder('/*ajlasdf' + left + node.text + right + '*/', node)
    }
  }


}

module.exports = HublStringifier