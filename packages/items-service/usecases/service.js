const createError = require('http-errors')
const { ObjectId } = require('mongodb')
const config = require('../config')
const { md5 } = require('../md5')

function buildServiceUsecase({ makeCollection, hotelService }) {
  /**
   * Get the collection of the specific tenant
   * @param {string} tenantId - id of tenant
   */
  const getCollection = async (tenantId) => {
    const collection = await makeCollection(config.database, tenantId)
    return collection
  }

  const remapServiceDocument = (serviceDoc) => {
    const {
      _id: id,
      hotelId,
      tenantId,
      createdAt,
      modifiedAt,
      hash,
      ...rest
    } = serviceDoc
    return {
      id,
      ...rest,
    }
  }

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
    const hash = md5(name.replace(' ', '').toLowerCase())
    const service = await collection.findOne({ hash })
    if (service) {
      throw new createError(400, 'Hotel service already exists')
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

  const findById = async ({ id, hotelId, tenantId }) => {
    if (!hotelId) {
      throw new createError(400, 'Hotel id is required')
    }
    if (!ObjectId.isValid(id)) {
      throw new createError(400, 'Service id is invalid')
    }
    const collection = await getCollection(tenantId)
    const service = await collection.findOne({
      _id: ObjectId(id),
    })
    if (!service) {
      throw new createError(404, 'Service not found')
    }
    return remapServiceDocument(service)
  }

  const deleteById = async ({ id, hotelId, tenantId }) => {
    if (!hotelId) {
      throw new createError(400, 'Hotel id is required')
    }
    if (!ObjectId.isValid(id)) {
      throw new createError(400, 'Service id is invalid')
    }
    const collection = await getCollection(tenantId)
    const { deletedCount } = await collection.deleteOne({
      _id: ObjectId(id),
    })
    return {
      ok: deletedCount === 1,
      count: deletedCount,
    }
  }

  return Object.freeze({
    /**
     * Create a hotel service
     * @param {object} service - hotel service information
     */
    insert,

    /**
     * Find service info by id
     * @param {object} opts
     * @param {string} opts.id - id of the service
     * @param {string} opts.hotelId - id of the hotel
     * @param {string} opts.tenantId - id of the tenant
     */
    findById,

    /**
     * Delete service info by id
     * @param {object} opts
     * @param {string} opts.id - id of the service
     * @param {string} opts.hotelId - id of the hotel
     * @param {string} opts.tenantId - id of the tenant
     */
    deleteById,
  })
}

module.exports = {
  buildServiceUsecase,
}
