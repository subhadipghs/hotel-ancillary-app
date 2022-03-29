

const jwt = require('jsonwebtoken')
const config = require('./config')

/**
* Sign a token with the provided payload
*
* @param {object} paylaod - payload to be signed
* @returns  {string} token
*/
exports.signToken = (payload, secret = config.secret) => {
  return new Promise((res, rej) => {
    try {
      // the expire method is hardcoded as 1 hour
      jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: config.expiresIn }, (err, token) => {
        if (err) {
          return rej(err)
        }
        res(token)
      })
    } catch (e) {
      rej(e)
    }
  })
}

/**
* Verify a token
*
* @param {string} token - token to be verified
* @param {string} secret - secret key
* @returns {object} decoded token
*/
exports.verifyToken = (token, secret = config.secret) => {
  return new Promise((res, rej) => {
    try {
      jwt.verify(token, secret, (e, decoded) => {
        if (e) {
          rej(e)
        }
        res(decoded)
      })
    } catch (e) {
      rej(e)
    }
  })
}


