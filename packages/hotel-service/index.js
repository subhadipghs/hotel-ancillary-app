"use strict"

const http = require('http')
const config = require('./config')
const { app } = require('./app')
const { logger } = require('./logger')
const { makeDb } = require('./mongo')

const server = http.createServer(app)

const main = async () => {
  await makeDb(config.database)
  server.listen(+config.port, () => {
    logger.info(`Hotel service on port ${config.port}`)
  })
}

main()
