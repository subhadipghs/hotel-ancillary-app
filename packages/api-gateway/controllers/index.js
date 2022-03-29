
const { addAccount, loginAccount } = require('../usecases')
const { buildRegisterController } = require('./register')
const { buildLoginController } = require('./login')


const registerController = buildRegisterController({ addAccount })
const loginController = buildLoginController({ loginAccount })


module.exports = Object.freeze({
  registerController,
  loginController
})
