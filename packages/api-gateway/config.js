

const dotenv = require('dotenv')
dotenv.config()

module.exports = Object.freeze({
  port: +process.env.PORT
})