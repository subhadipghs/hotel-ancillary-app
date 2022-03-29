const { makeAccount } = require('../accounts')
const config = require('../config')

function buildAddAccountUseCase({ accountDao, signToken }) {
  return async function ({ name, email, password } = {}) {
    const account = makeAccount({
      name,
      email,
      password,
    })
    const isAccountExists = await accountDao.findByEmailId(email)
    if (isAccountExists) {
      throw new Error('Account already exists with the provided email')
    }
    await accountDao.insert({
      id: account.getId(),
      name: account.getName(),
      email: account.getEmail(),
      password: await account.getPassword(),
      createdAt: account.getCreateDate(),
      modifiedAt: account.getModifiedDate(),
      isEmailVerified: account.isEmailVerified(),
    })
    const token = await signToken({
      id: account.getId(),
      name: account.getName(),
      email: account.getEmail()
    })
    return {
      token,
      expiresIn: config.expiresIn
    }
  }
  }

module.exports = {
  buildAddAccountUseCase
}
