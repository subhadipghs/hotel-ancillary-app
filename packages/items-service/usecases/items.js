const { default: Ajv } = require('ajv')
const createError = require('http-errors')
const { ObjectId } = require('mongodb')
const { logger } = require('../logger')

function buildItemsUsecase({ makeCollection, hotelService, hotelSvcService }) {
  /**
   * Get the collection of the specific tenant
   * @param {string} tenantId - id of tenant
   */
  const getCollection = async (tenantId) => {
    const collection = await makeCollection('items', tenantId)
    return collection
  }

  const insert = async ({
    payload,
    serviceId,
    hotelId,
    tenantId,
    active = true,
    createdAt = new Date(),
    modifiedAt = new Date(),
  }) => {
    if (!hotelId) {
      throw new createError(400, 'Hotel id is required')
    }
    const hotel = await hotelService.findOneHotel(hotelId, tenantId)
    if (!hotel) {
      throw new createError(404, 'Hotel not found')
    }
    const service = await hotelSvcService.findById({
      id: serviceId,
      hotelId,
      tenantId,
    })

    const schema = makeSchema(service.fields)
    const [isValid, errors] = validateSchema(schema, payload)

    if (!isValid) {
      logger.error(errors)
      throw new createError(400, 'Invalid items details provided')
    }

    const collection = await getCollection(tenantId)
    const result = await collection.insertOne({
      ...payload,
      tenantId,
      hotelId,
      serviceId,
      active,
      createdAt,
      modifiedAt,
    })
    return {
      id: result.insertedId,
    }
  }

  const remapItemDocument = (itemDoc) => {
    const {
      _id: id,
      hotelId,
      tenantId,
      createdAt,
      modifiedAt,
      ...rest
    } = itemDoc
    return {
      id,
      ...rest,
    }
  }

  const findItemById = async ({ itemId, serviceId, hotelId, tenantId }) => {
    const collection = await getCollection(tenantId)
    const item = await collection.findOne({
      _id: ObjectId(itemId),
      serviceId,
      hotelId,
      tenantId,
    })
    if (!item) {
      throw new createError(404, 'Item not found')
    }
    return remapItemDocument(item)
  }

  const deleteItemById = async ({ itemId, serviceId, hotelId, tenantId }) => {
    const collection = await getCollection(tenantId)
    const { deletedCount } = await collection.deleteOne({
      _id: ObjectId(itemId),
      serviceId,
      hotelId,
      tenantId,
    })
    if (deletedCount <= 0) {
      throw new createError(404, 'Item not found')
    }
    return {
      count: deletedCount,
      ok: deletedCount === 1,
    }
  }

  /**
   * Validate a schema against the payload
   *
   * @param {object} schema - schema to validate against
   * @param {object} payload - payload to be validated
   * @returns {[boolean, object]}
   */
  const validateSchema = (schema, payload) => {
    const ajv = new Ajv()
    logger.info({
      schema,
      payload,
    })
    const validate = ajv.compile(schema)
    const isValid = validate(payload)
    if (!isValid) {
      return [false, validate.errors]
    }
    return [true, null]
  }

  /**
   * Make validation schema for the items payload from the template stored in items
   *
   * @example
   * input -> [{ key: "name", value: "string" }]
   * output ->
   * {
   *   type: 'object',
   *   properties: {
   *     name: { type: 'string' }
   *   },
   *   additionalProperties: false,
   *   required: ['name']
   * }
   */
  const makeSchema = (template) => {
    const properties = template.reduce((prev, curr) => {
      return {
        ...prev,
        [curr.key]: {
          type: curr.value,
        },
      }
    }, {})
    let schema = {}
    schema.type = 'object'
    schema.properties = properties
    schema.additionalProperties = false
    schema.required = template.map((tmp) => tmp.key)
    return schema
  }

  return Object.freeze({
    insert,
    findItemById,
    deleteItemById,
  })
}

module.exports = {
  buildItemsUsecase,
}
