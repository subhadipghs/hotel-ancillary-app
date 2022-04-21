const api = require('express').Router()
const {
  createServiceApi,
  findServiceById,
  deleteById,
  updateById,
} = require('./serviceApi')
const { createItem, findById } = require('./itemsApi')

// items api
api.post('/hotels/:hotelId/services/:serviceId/items', createItem)
api.get('/hotels/:hotelId/services/:serviceId/items/:itemId', findById)

// service api
api.post('/hotels/:hotelId/services', createServiceApi)
api.get('/hotels/:hotelId/services/:serviceId', findServiceById)
api.delete('/hotels/:hotelId/services/:serviceId', deleteById)
api.patch('/hotels/:hotelId/services/:serviceId', updateById)

module.exports = Object.freeze({
  api,
})
