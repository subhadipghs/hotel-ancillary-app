const crypto = require('crypto')

/**
 * Make a md5 hash of the plainText
 * @param {string} plainText - text to be hashed
 * @return {string} hashed text
 */
exports.md5 = (plainText) => {
  return crypto
    .createHash('md5')
    .update(plainText, 'utf-8')
    .digest('hex')
}
