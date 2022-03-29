const createHttpError = require("http-errors")
const config = require("../config")
const { hotelUseCases } = require('../usecases')

/**
 * 
 * Create a hotel
 * 
 * POST /
 */
exports.createHotelApi = async (req, res, next) => {
  try {
    const paylaod = req.body
    const tenantId = req.get(config.tenantIdHeader)
    const result = await hotelUseCases.insert({
      ...paylaod,
      tenantId
    })
    return res.status(201).json({
      code: 201,
      ok: true,
      result
    })
  } catch (e) {
    next(e)
  }
}