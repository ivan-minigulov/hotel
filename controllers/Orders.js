const { Users, Orders } = require('../models/models')
const ApiError = require('../middleware/ApiError')
const { validationResult } = require('express-validator')

class OrdersController {
  async deleteOrder(req, res, next) {
    try {
      const { userId, orderId } = req.body
      const resultValidator = validationResult(req)
      if (!resultValidator.isEmpty()) {
        throw ApiError.BadRequest(resultValidator.array())
      }
      if (!userId) {
        return res.status(401).json({ msg: 'Пользователь не авторизован' })
      } else {
        const user = await Users.findByPk(userId)
        if (!user) {
          throw ApiError.BadRequest('Пользователь не найден')
        }
        const order = await Orders.findOne({
          where: {
            id: orderId,
            userId,
          },
        })
        if (!order) {
          throw ApiError.NotFound('Бронь не найдена')
        }
        await Orders.destroy({
          where: {
            id: orderId,
            userId,
          },
        })
        return res.status(200).json('Бронь успешно отменена')
      }
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new OrdersController()
