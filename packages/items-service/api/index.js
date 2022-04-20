const api = require('express').Router()
const {
  createServiceApi,
  findServiceById,
  deleteById,
  updateById,
} = require('./serviceApi')

api.post('/hotels/:hotelId/services', createServiceApi)
api.get('/hotels/:hotelId/services/:serviceId', findServiceById)
api.delete('/hotels/:hotelId/services/:serviceId', deleteById)
api.patch('/hotels/:hotelId/services/:serviceId', updateById)

module.exports = Object.freeze({
  api,
})
