
const { makeCollection } = require('../mongo')
const { buildHotelDao } = require('./hotel.dao')

const hotelDao = buildHotelDao({ makeCollection })

module.exports = {
  hotelDao
}
