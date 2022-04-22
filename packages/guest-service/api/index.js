const { addGuestApi, findGuestById } = require('./guest')
const api = require('express').Router()

// guests api
api.post('/hotels/:hotelId/guests', addGuestApi)
api.get('/hotels/:hotelId/guests/:guestId', findGuestById)

module.exports = {
  api,
}
