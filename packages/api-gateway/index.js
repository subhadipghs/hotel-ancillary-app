"use strict"

const http = require('http')
const config = require('./config')
const { app } = require('./app')
const { logger } = require('./logger')



const server = http.createServer(app)

server.listen(+config.port, () => {
  logger.info('Server is running on port', config.port)
})