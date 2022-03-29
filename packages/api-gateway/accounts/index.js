
const { buildAccount } = require('./account')
const { Id } = require('../id')
const argon = require('argon2')
const validator = require('validator')


/**
 * Create hash from plain text
 * @param {string} plainText - the plain text information to be hashed
 * @returns hashed text
 */
const makeHash = async (plainText) => await argon.hash(plainText)

/**
 * Verify hash from plain text
 * @param {string} hash - hashed text 
 * @param {string} plainText - the plain text information to be hashed
 * @returns hashed text
 */
const verifyHash = async (hash, plainText) => argon.verify(hash, plainText)

const makeAccount = buildAccount({ Id, validator, makeHash })

module.exports = Object.freeze({
  buildAccount,
  makeAccount,
  makeHash,
  verifyHash
})
