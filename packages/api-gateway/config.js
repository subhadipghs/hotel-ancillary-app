const dotenv = require('dotenv')
dotenv.config()

module.exports = Object.freeze({
  port: +process.env.PORT,
  mongoUrl: process.env.MONGODB_URL,
  database: process.env.DATABASE,
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.EXPIRES_IN,
  hotelServiceUrl: process.env.HOTEL_SERVICE_URL,
  hotelItemServicesUrl: process.env.HOTEL_ITEMS_SERVICES_URL,
  hotelGuestsServiceUrl: process.env.HOTEL_GUESTS_SERVICE_URL,
})
