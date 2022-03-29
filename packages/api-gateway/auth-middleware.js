const createError = require("http-errors")
const { TokenExpiredError } = require("jsonwebtoken")
const { verifyToken } = require("./jwt")

function buildAuthMiddleware({ verifyToken }) {
  /**
   * extract token from auth header
   * header should be `Bearer ${token}` format
   */
  function extractToken(authHeader) {
    const token = authHeader.split(" ")
    if (!token || token.length < 2) {
      return null
    }
    return token[1]
  }

  return async (req, _, next) => {
    try {
      const header = req.get("Authorization")
      if (!header) {
        return next(createError(403, 'Authorization header is required'))
      }
      const token = extractToken(header)
      if (!token) {
        return next(createError(401, "Token is missing from request header"))
      }
      const decoded = await verifyToken(token)
      if (decoded) {
        req.id = decoded.id
        next()
      } else {
        next(createError(401, "Malformed token received"))
      }
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        next(createError(401, "Token is expired"))
      } else {
        next(createError(401, e.message))
      }
    }
  }
}

module.exports = Object.freeze({
  buildAuthMiddleware,
  authMiddleware: buildAuthMiddleware({ verifyToken }),
})
