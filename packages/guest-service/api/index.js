const { addGuestApi } = require('./guest')
const api = require('express').Router()

// guests api
api.post('/hotels/:hotelId/guests', addGuestApi)

module.exports = {
  api,
}
