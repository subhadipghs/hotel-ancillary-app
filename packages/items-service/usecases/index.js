const { makeCollection } = require("../mongo")
const { buildServiceUsecase } = require("./service")
const { buildHotelService } = require("./hotel")

const hotelService = buildHotelService()
const serviceUsecase = buildServiceUsecase({ makeCollection, hotelService })

module.exports = Object.freeze({
  serviceUsecase,
  hotelService
})
