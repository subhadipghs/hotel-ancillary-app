
const { makeCollection } = require('../mongo')
const { buildHotelUsecases } = require('./hotel')

const hotelUseCases = buildHotelUsecases({ makeCollection })

module.exports = {
  hotelUseCases
}
