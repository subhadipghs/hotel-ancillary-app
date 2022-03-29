const api = require('express').Router()
const { createHotelApi } = require('./createHotelApi')
const { readHotelByIdApi } = require('./readHotelByIdApi')
const { updateApi } = require('./updateHotelById')

api.post('/', createHotelApi)
api.get('/:hotelId', readHotelByIdApi)
api.patch('/:hotelId', updateApi)

module.exports = Object.freeze({
  api
})
