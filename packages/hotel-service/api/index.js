const api = require('express').Router()


api.get('/health', (_, res) => {
  return res.json({
    ok: true,
    service: 'hotel-service'
  })
})


module.exports = Object.freeze({
  api
})
