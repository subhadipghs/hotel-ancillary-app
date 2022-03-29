
const createHttpError = require('http-errors')
const config = require('../config')
const { md5 } = require('../md5')

function buildHotelUsecases({ makeCollection }) {
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
      // make a hash with name and the address details so that any duplicate hotels cannot be added
      const hash = md5(
        `${name}-${address}-${state}-${city}-${postalCode}`.replace(" ", "").toLowerCase()
      )
      const hotel = await collection.findOne({ hash })
      if (hotel) {
        throw new createHttpError(400, 'Hotel already exists')
      }
      const result = await collection.insertOne({
        name,
        address,
        state,
        city,
        hash,
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
  buildHotelUsecases
}