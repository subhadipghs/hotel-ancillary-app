const api = require('express').Router()

api.get('/health', (_, res) => {
  return res.json({
    ok: true,
    service: 'items'
  })
})

module.exports = Object.freeze({
  api
})
