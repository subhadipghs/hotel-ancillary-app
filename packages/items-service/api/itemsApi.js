const config = require('../config')
const { itemsUsecase } = require('../usecases')

exports.createItem = async (req, res, next) => {
  try {
    const payload = req.body
    const tenantId = req.get(config.tenantIdHeader)
    const { hotelId, serviceId } = req.params
    const result = await itemsUsecase.insert({
      payload,
      serviceId,
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
