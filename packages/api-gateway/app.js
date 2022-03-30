"use strict"
const e = require("express")
const proxy = require("express-http-proxy")
const { api } = require("./api")
const { logger } = require("./logger")
const config = require('./config')
const { authMiddleware } = require('./auth-middleware')
const createError = require("http-errors")

const app = e()


// Here we are using proxy to redirect the request to the specific service
app.use(
  "/hotels/:hotelId/services",
  authMiddleware,
  proxy(config.hotelItemServicesUrl, {
    // only gives url after /proxy
    proxyReqOptDecorator: (proxyReqOpts, req) => {
      proxyReqOpts.headers['X-Tenant-Id'] = req.id
      return proxyReqOpts;
    },
  })
)

app.use(
  "/hotels",
  authMiddleware,
  proxy(config.hotelServiceUrl, {
    // only gives url after /proxy
    proxyReqOptDecorator: (proxyReqOpts, req) => {
      proxyReqOpts.headers['X-Tenant-Id'] = req.id
      return proxyReqOpts;
    }
  })
)

app.use(e.json())
app.use(api)


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
