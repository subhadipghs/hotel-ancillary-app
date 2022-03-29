const { signToken } = require("../jwt")
const { accountDao } = require("../dao")
const { buildAddAccountUseCase } = require("./add-account")

const addAccount = buildAddAccountUseCase({ accountDao, signToken })

module.exports = Object.freeze({
  addAccount,
})
