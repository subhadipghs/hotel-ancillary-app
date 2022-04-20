const api = require('express').Router()
const { createServiceApi, findServiceById } = require('./createServiceApi')

api.post('/hotels/:hotelId/services', createServiceApi)
api.get('/hotels/:hotelId/services/:serviceId', findServiceById)

module.exports = Object.freeze({
  api,
})
