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
      const details = await db.collection(collection).insertOne({
        ...account,
        _id: account.id
      })
      return {
        id: details.insertedId,
      }
    }
  })
}

module.exports = Object.freeze({
  makeAccountMongoDao
})
