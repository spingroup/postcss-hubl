'use strict'

let Node = require('postcss/lib/node')

class Hubl extends Node {
  constructor(defaults) {
    super(defaults)
    this.type = 'comment'
  }
}

module.exports = Hubl
Hubl.default = Hubl