const api = require('express').Router()
const { createHotelApi } = require('./createHotelApi')
const { readHotelByIdApi } = require('./readHotelByIdApi')
const { updateApi } = require('./updateHotelById')
const { deleteApi } = require('./deleteHotelApi')

api.post('/', createHotelApi)
api.get('/:hotelId', readHotelByIdApi)
api.patch('/:hotelId', updateApi)
api.delete('/:hotelId', deleteApi)

module.exports = Object.freeze({
  api
})
