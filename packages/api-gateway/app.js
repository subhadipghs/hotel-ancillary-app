"use strict"
const e = require('express')

const app = e()


app.get('/', (_, res) => {
  return res.json({
    ok: true,
    message: 'API gateway is running',
    uptime: process.uptime()
  })
})

exports.app = app