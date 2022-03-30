const createError = require("http-errors")
const { ObjectId } = require("mongodb")
const config = require("../config")
const { md5 } = require("../md5")

function buildServiceUsecase({ makeCollection, hotelService }) {
  /**
   * Get the collection of the specific tenant
   * @param {string} tenantId - id of tenant
   */
  const getCollection = async (tenantId) => {
    const collection = await makeCollection(config.database, tenantId)
    return collection
  }
  //
  // const findById = async (hotelId, tenantId) => {
  //   const collection = await getCollection(tenantId)
  //   const hotelService = await collection.findOne({ _id: new ObjectId(hotelId) })
  //   if (!hotel) {
  //     throw new createError(404, "Hotel service not found with the provided id")
  //   }
  //   return remapServiceDocument(hotelService)
  // }

  // const remapServiceDocument = (serviceDoc) => {
  //   const {
  //     _id: id,
  //     hotelId,
  //     tenantId,
  //     createdAt,
  //     modifiedAt,
  //     ...rest
  //   } = serviceDoc
  //   return {
  //     id,
  //     ...rest,
  //   }
  // }
  //
  const insert = async ({
    name,
    fields,
    hotelId,
    tenantId,
    active = true,
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
    // make a hash of the name to check if it already exists
    const hash = md5(name.replace(" ", "").toLowerCase())
    const service = await collection.findOne({ hash })
    if (service) {
      throw new createError(400, "Hotel service already exists")
    }
    const result = await collection.insertOne({
      name,
      fields,
      hash,
      tenantId,
      hotelId,
      active,
      createdAt,
      modifiedAt,
    })
    return {
      id: result.insertedId,
    }
  }

  return Object.freeze({
    /**
     * Create a hotel service
     * @param {object} service - hotel service information
     */
    insert,
  })
}

module.exports = {
  buildServiceUsecase,
}
