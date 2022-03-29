const { signToken } = require("../jwt");
const { accountDao } = require("../dao");
const { verifyHash } = require("../accounts");
const { buildAddAccountUseCase } = require("./add-account");
const { buildLoginAccountUseCase } = require("./login-account");

const addAccount = buildAddAccountUseCase({ accountDao, signToken });
const loginAccount = buildLoginAccountUseCase({
  accountDao,
  signToken,
  verifyHash,
});

module.exports = Object.freeze({
  addAccount,
  loginAccount
});
