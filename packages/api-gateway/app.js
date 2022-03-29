"use strict"
const e = require("express")
const proxy = require("express-http-proxy")
const { api } = require("./api")
const { logger } = require("./logger")
const { authMiddleware } = require('./auth-middleware')
const createError = require("http-errors")

const app = e()


app.use(e.json())
app.use(api)

app.use(
  "/proxy",
  authMiddleware,
  proxy("httpbin.org", {
    proxyReqPathResolver: (req) => {
      // only gives url after /proxy
      console.log('request user id', req.id)
      var parts = req.url.split("/")
      console.log(parts)
      return "/ip"
    },
  })
)

app.get('*', (_, __, next) => {
  next(createError(404, 'Path not found'))
})

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
