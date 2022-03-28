"use strict"

function buildAccount({ Id, makeHash, validator }) {
  return function ({
    id = Id.makeId(),
    name,
    email,
    phone,
    password,
    emailVerfied = false,
    phoneVerified = false,
    createdAt = new Date(),
    modifiedAt = new Date()
  } = {}) {

    if (!name || name.length < 2 || name.length > 300) {
      throw new Error('Account requires a valid name which should be between 2 and 300 characters');
    }

    if (!email || !validator.isEmail(email)) {
      throw new Error('Account requires a valid email id')
    }

    if (!phone || !validator.isMobilePhone(phone)) {
      throw new Error('Account requires a valid phone number')
    }

    let hash

    return Object.freeze({
      getId: () => id,
      getName: () => name,
      getEmail: () => email,
      getPhone: () => phone,
      getPassword: () => hash || (hash = makeHash(password)),
      isEmailVerified: () => emailVerfied,
      isPhoneVerified: () => phoneVerified,
      getCreateDate: () => createdAt,
      getModifiedDate: () => modifiedAt,
      markEmailVerified: () => {
        emailVerfied = true
      },
      markEmailNotVerified: () => {
        emailVerfied = false
      },
      markPhoneVerified: () => {
        phoneVerified = true
      },
      markPhoneNotVerified: () => {
        phoneVerified = false
      }
    })
  }
}


module.exports = Object.freeze({
  buildAccount
})