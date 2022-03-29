

const { v1 } = require('./v1')
const api = require('express').Router()


api.get('/', (_, res) => {
  return res.json({
    ok: true
  })
})

api.use('/v1', v1)

module.exports = Object.freeze({
  api
})
