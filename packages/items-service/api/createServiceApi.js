const config = require("../config")
const { serviceUsecase } = require('../usecases')

/**
 * 
 * Create a hotel service
 * 
 * POST /
 */
exports.createServiceApi = async (req, res, next) => {
  try {
    const paylaod = req.body
    const tenantId = req.get(config.tenantIdHeader)
    const hotelId = req.params.hotelId
    const result = await serviceUsecase.insert({
      ...paylaod,
      tenantId,
      hotelId
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