"use strict"

const { MongoClient } = require("mongodb")
const config = require("./config")
const { logger } = require("./logger")

const client = new MongoClient(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let connected = false

client.on("connectionReady", () => {
  logger.info("MongoDB is ready")
  connected = true
})

module.exports = Object.freeze({
  /** get the mongodb client instance */
  getClient: () => client,
  /** whether the client is connected or not */
  isConnected: () => connected,
  /**
   * Make a db in mongodb instance with the provided name
   * @param {string} dbName - name of the db
   */
  makeDb: async (dbName) => {
    try {
      if (!connected) {
        await client.connect()
        logger.info("connected with the database " + dbName)
      }
      return client.db(dbName)
    } catch (e) {
      logger.error("unable to connect to db " + dbName)
      return null
    }
  },
})
