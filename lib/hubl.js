'use strict'

let Node = require('postcss/lib/node')

class Hubl extends Node {
  constructor(defaults) {
    console.log('Constructing new HUBL')
    super(defaults)
    this.type = 'comment'
    if (!this.nodes) this.nodes = []
  }
}

module.exports = Hubl
Hubl.default = Hubl