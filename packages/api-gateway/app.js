"use strict"
const e = require('express')
const { api } = require('./api')
const { logger } = require('./logger')

const app = e()

app.use(e.json())
app.use(api)

app.use((err, _, res, __) => {
  logger.error(err.message)
  logger.error(err.stack)
  const code = err.status ?? 500
  return res.status(code).json({
    ok: false,
    code,
    message: err.message,
  })
})


exports.app = app
