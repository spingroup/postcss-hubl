let tokenizer = require('./tokenize');
let Parser = require('postcss/lib/parser');
let Comment = require('postcss/lib/comment');
let Hubl = require('./lib/hubl');

class HublParser extends Parser {
  createTokenizer() {
    this.tokenizer = tokenizer(this.input, {
      ignoreErrors: true
    })
  }
  parse() {
    let token
    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken();
      switch (token[0]) {
        case 'space':
          this.spaces += token[1]
          break

        case ';':
          this.freeSemicolon(token)
          break

        case 'hubl-exp':
          this.hubl(token);
          break

        case 'hubl-stmt':
          this.hubl(token);
          break

        case '}':
          this.end(token)
          break

        case 'comment':
          this.comment(token)
          break

        case 'at-word':
          this.atrule(token)
          break

        case '{':
          this.emptyRule(token)
          break

        default:
          this.other(token)
          break
      }
    }
    this.endFile()
  }
  logToken(token) {
    console.log('logToken: ', token);
  }


  hubl(token) {
    let node = new Hubl();
    this.init(node, token[2]);
    node.source.end = this.getPosition(token[3] || token[2])

    console.log('running parser')

    let text = token[1];
    node.raws.hubl = true;
    node.text = text;
    node.raws.left = " ";
    node.raws.right = " ";
  }

}

module.exports = HublParser