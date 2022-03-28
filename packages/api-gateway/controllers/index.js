
const { addAccount } = require('../usecases')
const { buildRegisterController } = require('./register')


const registerController = buildRegisterController({ addAccount })


module.exports = Object.freeze({
  registerController
})
