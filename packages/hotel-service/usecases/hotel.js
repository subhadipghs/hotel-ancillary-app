const createError = require("http-errors");
const { ObjectId } = require("mongodb");
const config = require("../config");
const { md5 } = require("../md5");

function buildHotelUsecases({ makeCollection }) {
  /**
   * Get the collection of the specific tenant
   * @param {string} tenantId - id of tenant
   */
  const getCollection = async (tenantId) => {
    const collection = await makeCollection(config.database, tenantId);
    return collection;
  };

  const findById = async (hotelId, tenantId) => {
    const collection = await getCollection(tenantId);
    const hotel = await collection.findOne({ _id: new ObjectId(hotelId) });
    if (!hotel) {
      throw new createError(404, "Hotel not found with the provided id");
    }
    const {
      _id: id,
      tenantId: tenant,
      createdAt,
      modifiedAt,
      hash,
      ...rest
    } = hotel;
    return {
      id,
      ...rest,
    };
  };

  const insert = async ({
    name,
    address,
    state,
    city,
    postalCode,
    tenantId,
    totalRooms,
    active = true,
    createdAt = new Date(),
    modifiedAt = new Date(),
  }) => {
    const collection = await getCollection(tenantId);
    // make a hash with name and the address details so that any duplicate hotels cannot be added
    const hash = md5(
      `${name}-${address}-${state}-${city}-${postalCode}`
        .replace(" ", "")
        .toLowerCase()
    );
    const hotel = await collection.findOne({ hash });
    if (hotel) {
      throw new createError(400, "Hotel already exists");
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
      modifiedAt,
    });
    return {
      id: result.insertedId,
    };
  };

  const updateById = async (hotelId, tenantId, payload) => {
    if (!hotelId || !ObjectId.isValid(hotelId)) {
      throw new createError(400, "Invalid hotel id received");
    }
    if (!tenantId) {
      throw new createError(400, "Tenant id is required");
    }
    if (!payload) {
      throw new createError(400, "Empty payload provided");
    }
    const collection = await getCollection(tenantId);
    const { modifiedCount } = await collection.updateOne(
      { _id: ObjectId(hotelId) },
      { $set: payload }
    );
    if (!modifiedCount) {
      throw new createError(404, "Hotel not found");
    }
    return {
      updated: 1,
    };
  };

  return Object.freeze({
    /**
     * Create a hotel
     * @param {object} hotel - hotel data
     */
    insert,
    /**
     * Read a hotel by hotel id
     * @param {string} hotelId - id of the hotel
     * @param {string} tenantId - id of the tenant
     */
    findById,
    /**
     * Update a hotel by hotel id
     * @param {string} hotelId - id of the hotel
     * @param {string} tenantId - id of the tenant
     * @param {string} payload - fields to be updated
     */
    updateById,
  });
}

module.exports = {
  buildHotelUsecases,
};
