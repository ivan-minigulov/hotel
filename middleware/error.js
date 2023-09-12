const ApiError = require('./ApiError')

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, status: err.status })
  }
  return res
    .status(500)
    .json({ message: 'Непредвиденная ошибка!' + ' ' + err.message })
}
