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

exports.findById = async (req, res, next) => {
  try {
    const tenantId = req.get(config.tenantIdHeader)
    const { hotelId, serviceId, itemId } = req.params
    const result = await itemsUsecase.findItemById({
      itemId,
      serviceId,
      tenantId,
      hotelId,
    })
    return res.status(200).json({
      code: 200,
      ok: true,
      result,
    })
  } catch (e) {
    next(e)
  }
}
