'use strict'

const cuid = require('cuid')

const Id = {
  makeId: () => cuid(),
  isValidId: () => cuid.isCuid()
}

module.exports = Object.freeze({
  Id
})