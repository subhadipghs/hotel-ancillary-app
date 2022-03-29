const api = require('express').Router()
const { createHotelApi } = require('./createHotelApi')
const { readHotelByIdApi } = require('./readHotelByIdApi')

api.post('/', createHotelApi)
api.get('/:hotelId', readHotelByIdApi)

module.exports = Object.freeze({
  api
})
