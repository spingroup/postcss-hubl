let HublStringifier = require('./hubl-stringifier')

module.exports = function hublStringify(node, builder) {
  let str = new HublStringifier(builder)
  console.log('this is the new class =========================')
  str.stringify(node)
}