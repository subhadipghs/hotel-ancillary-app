
const e = require('express').Router()
const { registerController, loginController } = require('../../controllers')

e.post('/account/register', registerController)
e.post('/account/login', loginController)

module.exports = Object.freeze({
  v1: e
})
