let HublStringifier = require('./hubl-stringifier')

module.exports = function hublStringify(node, builder) {
  let str = new HublStringifier(builder)
  str.stringify(node)
}