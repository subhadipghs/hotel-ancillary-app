const api = require('express').Router()
const { createHotelApi } = require('./createHotelApi')


api.get('/health', (_, res) => {
  return res.json({
    ok: true,
    service: 'hotel-service'
  })
})

api.post('/', createHotelApi)


module.exports = Object.freeze({
  api
})
