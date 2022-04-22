const { guestUsecase } = require('../usecases')
const config = require('../config')

exports.addGuestApi = async (req, res, next) => {
  try {
    const paylaod = req.body
    const tenantId = req.get(config.tenantIdHeader)
    const hotelId = req.params.hotelId
    const result = await guestUsecase.addGuest({
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

exports.findGuestById = async (req, res, next) => {
  try {
    const tenantId = req.get(config.tenantIdHeader)
    const { hotelId, guestId } = req.params
    const result = await guestUsecase.findGuestById({
      guestId,
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

exports.deleteGuestById = async (req, res, next) => {
  try {
    const tenantId = req.get(config.tenantIdHeader)
    const { hotelId, guestId } = req.params
    const result = await guestUsecase.deleteGuestById({
      guestId,
      tenantId,
      hotelId,
    })
    return res.status(200).json({
      code: 200,
      ...result,
    })
  } catch (e) {
    next(e)
  }
}
