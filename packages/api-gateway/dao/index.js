'use strict'

const { makeDb } = require('../mongo')
const { buildAccountDao } = require('./account.dao')
const { makeAccountMongoDao } = require('./impl/account-mongo.dao.impl')

const accountDaoImplementation  = makeAccountMongoDao({ makeDb })
const accountDao = buildAccountDao({ daoImplementation: accountDaoImplementation })


module.exports = Object.freeze({
  accountDao,
})
