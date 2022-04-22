const {
  addGuestApi,
  findGuestById,
  deleteGuestById,
  updateGuestById,
} = require('./guest')
const api = require('express').Router()

// guests api
api.post('/hotels/:hotelId/guests', addGuestApi)
api.get('/hotels/:hotelId/guests/:guestId', findGuestById)
api.delete('/hotels/:hotelId/guests/:guestId', deleteGuestById)
api.patch('/hotels/:hotelId/guests/:guestId', updateGuestById)

module.exports = {
  api,
}
