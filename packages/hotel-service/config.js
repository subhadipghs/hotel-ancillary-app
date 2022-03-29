
const dotenv = require('dotenv')
dotenv.config()

module.exports = Object.freeze({
  port: +process.env.PORT,
  mongoUrl: process.env.MONGODB_URL,
  database: process.env.DATABASE,
  tenantIdHeader: process.env.TENANT_HEADER
})
