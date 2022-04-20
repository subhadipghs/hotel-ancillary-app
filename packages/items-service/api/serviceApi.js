const config = require('../config')
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
      hotelId,
    })
    return res.status(201).json({
      code: 201,
      ok: true,
      result,
    })
  } catch (e) {
    next(e)
  }
}

/**
 * GET /:id
 *
 */
exports.findServiceById = async (req, res, next) => {
  try {
    const id = req.params.serviceId
    const tenantId = req.get(config.tenantIdHeader)
    const hotelId = req.params.hotelId
    const result = await serviceUsecase.findById({
      id,
      tenantId,
      hotelId,
    })
    return res.status(201).json({
      code: 200,
      ok: true,
      result,
    })
  } catch (e) {
    next(e)
  }
}

/**
 * DELETE /:serviceId
 *
 */
exports.deleteById = async (req, res, next) => {
  try {
    const id = req.params.serviceId
    const tenantId = req.get(config.tenantIdHeader)
    const hotelId = req.params.hotelId
    const result = await serviceUsecase.deleteById({
      id,
      tenantId,
      hotelId,
    })
    const status = result.ok ? 200 : 404
    return res.status(status).json({
      code: status,
      ...result,
    })
  } catch (e) {
    next(e)
  }
}

exports.updateById = async (req, res, next) => {
  try {
    const payload = req.body
    const tenantId = req.get(config.tenantIdHeader)
    const hotelId = req.params.hotelId
    const serviceId = req.params.serviceId
    const result = await serviceUsecase.updateById({
      id: serviceId,
      payload,
      tenantId,
      hotelId,
    })
    const status = result.ok ? 200 : 404
    return res.status(status).json({
      code: status,
      ...result,
    })
  } catch (e) {
    next(e)
  }
}
