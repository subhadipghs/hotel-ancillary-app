
const { buildAddAccountUseCase } = require('./add-account')
const { accountDao } = require('../dao')

const addAccount = buildAddAccountUseCase({ accountDao })

module.exports = Object.freeze({
  addAccount
})
