const { makeAccount } = require('../accounts')
const config = require('../config')

function buildAddAccountUseCase({ accountDao, signToken }) {
  return async function ({ name, email, password, phone } = {}) {
    const account = makeAccount({
      name,
      email,
      password,
      phone,
    })
    await accountDao.insert({
      id: account.getId(),
      name: account.getName(),
      email: account.getEmail(),
      password: await account.getPassword(),
      createdAt: account.getCreateDate(),
      modifiedAt: account.getModifiedDate(),
      phone: account.getPhone(),
      isEmailVerified: account.isEmailVerified(),
      isPhoneVerified: account.isPhoneVerified(),
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
