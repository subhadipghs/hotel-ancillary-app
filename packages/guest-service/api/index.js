const { addGuestApi, findGuestById, deleteGuestById } = require('./guest')
const api = require('express').Router()

// guests api
api.post('/hotels/:hotelId/guests', addGuestApi)
api.get('/hotels/:hotelId/guests/:guestId', findGuestById)
api.delete('/hotels/:hotelId/guests/:guestId', deleteGuestById)

module.exports = {
  api,
}
