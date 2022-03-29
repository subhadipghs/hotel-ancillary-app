
const config = require("../config")
const { hotelUseCases } = require('../usecases')

/**
 * 
 * Read a list of hotels
 * 
 * GET /
 */
exports.getHotelChains = async (req, res, next) => {
  try {
    const tenantId = req.get(config.tenantIdHeader)
    const result = await hotelUseCases.getHotels(tenantId)
    return res.status(201).json({
      code: 201,
      ok: true,
      result
    })
  } catch (e) {
    next(e)
  }
}
