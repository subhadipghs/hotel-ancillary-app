const { v1 } = require('./v1')
const api = require('express').Router()
const { isConnected } = require('../mongo')

api.get('/', async (_, res) => {
  return res.json({
    ok: true,
    db: isConnected(),
  })
})

api.use('/v1', v1)

module.exports = Object.freeze({
  api,
})
