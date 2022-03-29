
const { verifyToken } = require('./jwt')

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
    const header = req.get('Authorization')
    const token = extractToken(header)
    if (!token) {
      return next(new Error('token missing'))
    }
    const decoded = await verifyToken(token)
    if (decoded) {
      console.log('decoded ', decoded)
      req.id = decoded.id
      next()
    } else {
      next(new Error('something went wrong. payload not found'))
    }
  }
}

module.exports = Object.freeze({
  buildAuthMiddleware,
  authMiddleware: buildAuthMiddleware({ verifyToken })
})
