const { makeCollection } = require('../mongo')
const { buildHotelService } = require('./hotel')
const { buildGuestUsecase } = require('./guest')
const hotelService = buildHotelService()
const guestUsecase = buildGuestUsecase({
  hotelService,
  makeCollection,
})

module.exports = {
  guestUsecase,
  hotelService,
}
