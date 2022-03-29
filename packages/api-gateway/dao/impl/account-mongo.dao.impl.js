'use strict'

const mongo = require('mongodb')
const config = require('../../config')

function makeAccountMongoDao({ makeDb }) {
  // name of the database in mongodb
  const collection = 'accounts'
  return Object.freeze({
    /**
    * Insert account detail into mongodb
    */
    insert: async (account) => {
      const db = await makeDb(config.database)
      const { id, ...rest } = account
      const details = await db.collection(collection).insertOne({
        _id: id,
        ...rest,
      })
      return {
        id: details.insertedId,
      }
    },

    /**
    * Find an account by email id
    */
    findByEmailId: async (email) => {
      const db = await makeDb(config.database)
      const account = await db.collection(collection).findOne({
        email
      })
      if (account) {
        const { _id, ...rest } = account
        return {
          id: _id,
          ...rest
        }
      }
      return null
    }
  })
}

module.exports = Object.freeze({
  makeAccountMongoDao
})
