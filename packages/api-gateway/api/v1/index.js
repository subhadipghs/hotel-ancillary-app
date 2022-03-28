
const e = require('express').Router()
const { registerController } = require('../../controllers')

e.post('/account', registerController)

module.exports = Object.freeze({
  v1: e
})
