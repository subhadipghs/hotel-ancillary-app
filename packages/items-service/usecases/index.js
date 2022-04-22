const { makeCollection } = require('../mongo')
const { buildServiceUsecase } = require('./service')
const { buildItemsUsecase } = require('./items')
const { buildHotelService } = require('./hotel')

const hotelService = buildHotelService()
const serviceUsecase = buildServiceUsecase({ makeCollection, hotelService })
const itemsUsecase = buildItemsUsecase({
  makeCollection,
  hotelSvcService: serviceUsecase,
  hotelService,
})

module.exports = Object.freeze({
  serviceUsecase,
  hotelService,
  itemsUsecase,
})
