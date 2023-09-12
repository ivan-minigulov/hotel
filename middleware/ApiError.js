class ApiError extends Error {
  status
  message
  errors

  constructor(status, message, errors = []) {
    super(message)
    this.status = status
    this.message = message
    this.errors = errors
  }

  static BadRequest(message) {
    return new ApiError(400, message)
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован')
  }

  static NotFound(message) {
    return new ApiError(404, message)
  }
}

module.exports = ApiError
