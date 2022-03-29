const config = require("../config")
const { hotelUseCases } = require('../usecases')

/**
 * Delete a hotel by id
 * 
 * DELETE /:hotelId
 */
exports.deleteApi = async (req, res, next) => {
  try {
    const tenantId = req.get(config.tenantIdHeader)
    const hotelId = req.params.hotelId
    const result = await hotelUseCases.deleteById(hotelId, tenantId)
    return res.status(201).json({
      code: 200,
      ok: true,
      result
    })
  } catch (e) {
    next(e)
  }
}
