const config = require('../config')

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

  return Object.freeze({
    addGuest,
  })
}
