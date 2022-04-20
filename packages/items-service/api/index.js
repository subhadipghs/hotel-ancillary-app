const api = require('express').Router()
const {
  createServiceApi,
  findServiceById,
  deleteById,
} = require('./serviceApi')

api.post('/hotels/:hotelId/services', createServiceApi)
api.get('/hotels/:hotelId/services/:serviceId', findServiceById)
api.delete('/hotels/:hotelId/services/:serviceId', deleteById)

module.exports = Object.freeze({
  api,
})
