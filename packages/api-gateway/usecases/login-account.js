const config = require('../config')
const { logger } = require('../logger')

function buildLoginAccountUseCase({ accountDao, signToken, verifyHash }) {
  return async function ({ email, password } = {}) {
   const account = await accountDao.findByEmailId(email)
    if (!account) {
      throw new Error('Account does not exists')
    }
    const passwordMatch = await verifyHash(account.password, password) 
    logger.info(passwordMatch)
    if (!passwordMatch) {
      throw new Error('Invalid email or password')
    }
    const token = await signToken({
      id: account.id,
      name: account.name,
      email: account.email
    })
    return {
      token,
      expiresIn: config.expiresIn
    }
  }
  }

module.exports = Object.freeze({
 buildLoginAccountUseCase 
})
