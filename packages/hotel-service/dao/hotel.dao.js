
const config = require('../config')

function buildHotelDao({ makeCollection }) {

  return Object.freeze({
    /**
     * Create a hotel
     * @param {object} hotel - hotel data
     */
    insert: async ({
      name,
      address,
      state,
      city,
      postalCode,
      tenantId,
      totalRooms,
      active = true,
      createdAt = new Date(),
      modifiedAt = new Date()
    }) => {
      const collection = await makeCollection(config.database, tenantId)
      const result = await collection.insertOne({
        name,
        address,
        state,
        city,
        postalCode,
        tenantId,
        totalRooms,
        active,
        createdAt,
        modifiedAt
      })
      return {
        id: result.insertedId
      }
    }
  })
}

module.exports = {
  buildHotelDao
}