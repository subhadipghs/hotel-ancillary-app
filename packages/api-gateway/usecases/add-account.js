const { makeAccount } = require('../accounts')

function buildAddAccountUseCase({ accountDao }) {
  return async function ({ name, email, password, phone } = {}) {
    const account = makeAccount({
      name,
      email,
      password,
      phone,
    })
    const newAccount = await accountDao.insert({
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
    return {
      id: newAccount.id,
      name: account.getName(),
      email: account.getEmail(), 
    }
  }
}

module.exports = {
  buildAddAccountUseCase
}
