const axios = require("axios").default
const config = require("../config")
const { logger } = require("../logger")

/*
 * Communicates with the hotel service
 * @param {string} hotelServiceUrl - url of of the hotel service
 */
exports.buildHotelService = function (
  hotelServiceUrl = config.hotelServiceUrl
) {
  const makeUrl = (hotelId) => `${hotelServiceUrl}/${hotelId}`
  /**
   * Find a hotel by hotel id
   */
  async function findOneHotel(hotelId, tenantId) {
    try {
      logger.info(
        "making request to " + makeUrl(hotelId) + "\n" + "tenantId: " + tenantId
      )
      const result = await axios.get(makeUrl(hotelId), {
        headers: {
          [config.tenantIdHeader]: tenantId,
        },
        timeout: 1000,
      })
      if (result.data && result.data.ok) {
        return result.data.result
      } else {
        return null
      }
    } catch (e) {
      logger.error(e)
      return null
    }
  }

  return Object.freeze({
    findOneHotel,
  })
}
