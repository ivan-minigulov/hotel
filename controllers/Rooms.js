const { Op } = require('sequelize')
const { Users, Rooms, Orders } = require('../models/models')
const ApiError = require('../middleware/ApiError')
const uuid = require('uuid')
const { validationResult } = require('express-validator')

class RoomsController {
  async getRooms(req, res, next) {
    try {
      const { startDate, endDate } = req.query
      if (!startDate && !endDate) {
        const rooms = await Rooms.findAll()
        return res.status(200).json(rooms)
      }
      if (!startDate) {
        throw ApiError.BadRequest('Выберите дату заезда')
      }
      if (!endDate) {
        throw ApiError.BadRequest('Выберите дату выезда')
      }
      const resultValidator = validationResult(req)
      if (!resultValidator.isEmpty()) {
        throw ApiError.BadRequest(
          'Неверно указана дата! Тип должен быть YYYY-MM-DD'
        )
      }
      if (new Date(startDate) >= new Date(endDate)) {
        throw ApiError.BadRequest('Не корректно указаны даты заезда и выезда')
      }
      const rooms = await Rooms.findAll({
        where: {
          [Op.or]: [
            { '$orders.roomId$': { [Op.is]: null } },
            {
              [Op.or]: [
                { '$orders.startDate$': { [Op.gte]: endDate } },
                { '$orders.endDate$': { [Op.lte]: startDate } },
              ],
            },
          ],
        },
        include: [
          {
            model: Orders,
            as: 'orders',
            required: false,
            attributes: [],
          },
        ],
      })
      if (!rooms) {
        throw ApiError.NotFound('Нет свободных комнат на эти даты')
      }
      return res.status(200).json(rooms)
    } catch (e) {
      next(e)
    }
  }

  async postBookRoom(req, res, next) {
    try {
      const { roomId } = req.params
      const { userId, startDate, endDate } = req.body
      if (!userId) {
        throw ApiError.UnauthorizedError()
      } else {
        const resultValidator = validationResult(req)
        if (!resultValidator.isEmpty()) {
          throw ApiError.BadRequest(resultValidator.array())
        }
        const user = await Users.findByPk(userId)
        if (!user) {
          throw ApiError.BadRequest('Пользователь не найден')
        }
        if (!startDate || !endDate) {
          throw ApiError.BadRequest('Выберите дату заезда и дату выезда')
        }
        if (new Date(startDate) >= new Date(endDate)) {
          throw ApiError.BadRequest('Не корректно указаны даты заезда и выезда')
        }
        const exOrder = await Orders.findOne({
          where: {
            roomId,
            startDate: { [Op.lte]: endDate },
            endDate: { [Op.gte]: startDate },
          },
        })
        if (exOrder) {
          throw ApiError.BadRequest(
            'Невозможно забронировать комнату на эти даты'
          )
        }

        const order = await Orders.create({
          id: uuid.v4(),
          roomId,
          userId,
          vip: user.vip,
          startDate,
          endDate,
        })
        return res
          .status(200)
          .json({ msg: `Успешно забронировано`, data: order })
      }
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new RoomsController()
