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
    node.source.end = this.getPosition(token[3] || token[2]);
    // let text = token[1].slice(2, -2);
    let text = token[1];
    node.raws.hubl = true;
    node.text = text;
    node.raws.left = "";
    node.raws.right = '\n';
    node.raws.before = '\n';
    node.raws.after = '\n';
  }

  comment(token) {
    let node = new Comment()
    this.init(node, token[2])
    node.source.end = this.getPosition(token[3] || token[2])

    let text = token[1].slice(2, -2)
    if (/^\s*$/.test(text)) {
      node.text = ''
      node.raws.left = text
      node.raws.right = ''
    } else {
      let match = text.match(/^(\s*)([^]*\S)(\s*)$/)
      node.text = match[2]
      node.raws.left = match[1]
      node.raws.right = match[3]
    }
  }

}

module.exports = HublParser