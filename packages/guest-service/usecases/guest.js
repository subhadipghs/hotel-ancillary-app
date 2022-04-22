const createError = require('http-errors')
const { ObjectId } = require('mongodb')
const config = require('../config')
const { logger } = require('../logger')

exports.buildGuestUsecase = function buildGuestUsecase({
  makeCollection,
  hotelService,
}) {
  /**
   * Get the collection of the specific tenant
   * @param {string} tenantId - id of tenant
   */
  const getCollection = async (tenantId) => {
    const collection = await makeCollection(config.database, tenantId)
    return collection
  }

  const addGuest = async ({
    name,
    phone,
    room,
    checkOutTime,
    checkInTime,
    hotelId,
    tenantId,
    createdAt = new Date(),
    modifiedAt = new Date(),
  }) => {
    const collection = await getCollection(tenantId)
    if (!hotelId) {
      throw new createError(400, 'Hotel id is required')
    }
    const hotel = await hotelService.findOneHotel(hotelId, tenantId)
    if (!hotel) {
      throw new createError(404, 'Hotel not found')
    }
    const result = await collection.insertOne({
      name,
      room,
      phone,
      checkInTime,
      checkOutTime,
      tenantId,
      hotelId,
      createdAt,
      modifiedAt,
    })
    return {
      id: result.insertedId,
    }
  }

  const remapGuestDoc = (guestDoc) => {
    const {
      _id: id,
      hotelId,
      tenantId,
      createdAt,
      modifiedAt,
      ...rest
    } = guestDoc
    return {
      id,
      ...rest,
    }
  }

  const findGuestById = async ({ guestId, hotelId, tenantId }) => {
    const collection = await getCollection(tenantId)
    const result = await collection.findOne({
      _id: ObjectId(guestId),
      hotelId,
      tenantId,
    })
    if (!result) {
      throw new createError(404, 'Guest not found')
    }
    return remapGuestDoc(result)
  }

  const deleteGuestById = async ({ guestId, hotelId, tenantId }) => {
    const collection = await getCollection(tenantId)
    const { deletedCount } = await collection.deleteOne({
      _id: ObjectId(guestId),
      hotelId,
      tenantId,
    })
    if (deletedCount < 1) {
      throw new createError(404, 'Guest not found')
    }
    return {
      ok: deletedCount == 1,
      count: deletedCount,
    }
  }

  const updateGuestById = async ({ payload, hotelId, guestId, tenantId }) => {
    if (!hotelId) {
      throw new createError(400, 'Hotel id is required')
    }
    const hotel = await hotelService.findOneHotel(hotelId, tenantId)
    if (!hotel) {
      throw new createError(404, 'Hotel not found')
    }
    const collection = await getCollection(tenantId)
    logger.info({
      payload,
    })
    const result = await collection.updateOne(
      { _id: ObjectId(guestId) },
      {
        $set: {
          ...payload,
          modifiedAt: new Date(),
        },
      }
    )
    if (result.modifiedCount < 1) {
      throw new createError(404, 'Guest not found')
    }
    return {
      count: result.modifiedCount,
      ok: result.modifiedCount == 1,
    }
  }

  return Object.freeze({
    addGuest,
    findGuestById,
    deleteGuestById,
    updateGuestById,
  })
}
