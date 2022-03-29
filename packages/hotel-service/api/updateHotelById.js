const config = require("../config")
const { hotelUseCases } = require('../usecases')

/**
 * 
 * Update a hotel
 * 
 * PATCH /:hotelId
 */
exports.updateApi = async (req, res, next) => {
  try {
    const payload = req.body
    const tenantId = req.get(config.tenantIdHeader)
    const hotelId = req.params.hotelId
    const result = await hotelUseCases.updateById(hotelId, tenantId, payload)
    return res.status(201).json({
      code: 200,
      ok: true,
      result
    })
  } catch (e) {
    next(e)
  }
}
