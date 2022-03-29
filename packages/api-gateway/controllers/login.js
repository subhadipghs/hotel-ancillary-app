function buildLoginController({ loginAccount }) {
  return async function (req, res, next) {
    try {
      const payload = req.body
      const result = await loginAccount(payload)
      return res.status(201).json({
        ok: true,
        result,
      })
    } catch (e) {
      next(e)
    }
  }
}

module.exports = Object.freeze({
  buildLoginController,
})
