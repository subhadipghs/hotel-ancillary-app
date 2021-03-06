const config = require("../config")
const { logger } = require("../logger")
const { hotelUseCases } = require('../usecases')

/**
 * 
 * Read a hotel
 * 
 * GET /:hotelId
 */
exports.readHotelByIdApi = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId
    logger.info(hotelId)
    const tenantId = req.get(config.tenantIdHeader)
    const result = await hotelUseCases.findById(hotelId, tenantId)
    return res.status(201).json({
      code: 201,
      ok: true,
      result
    })
  } catch (e) {
    next(e)
  }
}
