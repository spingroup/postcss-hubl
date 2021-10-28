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
      // let nextT = this.tokenizer.nextToken();
      // this.logToken(token);
      console.log(token);

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
    node.raws.left = " al;ksdjf;laksjd";
    node.raws.right = '';
    node.raws.before = '\n';
    node.raws.after = '\n';
    console.log('HUBL FIRE -------------------')
    console.log(node);
    console.log('HUBL FIRE -------------------')
  }

  comment(token) {
    let node = new Comment()
    console.log('comment log');
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
  unknownWord(tokens) {
    console.log("unknown-Words", tokens);
    console.log("")
    if (tokens[0][0] == 'word' && tokens[0][1] == '%') {
      console.log('skipping error');
    } else {
      throw this.input.error('Unknown word', tokens[0][2])
    }
  }

}

module.exports = HublParser