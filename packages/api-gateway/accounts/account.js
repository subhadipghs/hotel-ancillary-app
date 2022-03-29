"use strict"

function buildAccount({ Id, makeHash, validator }) {
  return function ({
    id = Id.makeId(),
    name,
    email,
    password,
    emailVerfied = false,
    createdAt = new Date(),
    modifiedAt = new Date()
  } = {}) {

    if (!name || name.length < 2 || name.length > 300) {
      throw new Error('Account requires a valid name which should be between 2 and 300 characters');
    }

    if (!email || !validator.isEmail(email)) {
      throw new Error('Account requires a valid email id')
    }

    let hash

    return Object.freeze({
      getId: () => id,
      getName: () => name,
      getEmail: () => email,
      getPassword: async () => hash || (hash = await makeHash(password)),
      isEmailVerified: () => emailVerfied,
      getCreateDate: () => createdAt,
      getModifiedDate: () => modifiedAt,
      markEmailVerified: () => {
        emailVerfied = true
      },
      markEmailNotVerified: () => {
        emailVerfied = false
      },
   })
  }
}


module.exports = Object.freeze({
  buildAccount
})
