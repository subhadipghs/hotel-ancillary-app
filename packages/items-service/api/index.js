const api = require("express").Router()
const { createServiceApi } = require("./createServiceApi")

api.get("/hotels/:hotelId/services/health", (req, res) => {
  return res.json({
    ok: true,
    service: "items",
    params: req.params,
  })
})

api.post("/hotels/:hotelId/services", createServiceApi)

module.exports = Object.freeze({
  api,
})
