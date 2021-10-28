let {
  Input
} = require('postcss')

let HublParser = require('./hubl-parser')

module.exports = function hublParse(css, opts) {

  console.log('Running new parser ==========================+');
  let input = new Input(css, opts)

  let parser = new HublParser(input)
  parser.parse()

  return parser.root
}