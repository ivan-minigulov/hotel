const Router = require('express')
const router = new Router()
const roomsController = require('../controllers/Rooms')
const { query, body, param } = require('express-validator')

router.get(
  '/',
  query(['startDate', 'endDate']).isDate(),
  roomsController.getRooms
)
router.post(
  '/:roomId',
  body(['startDate', 'endDate']).isDate(),
  body('userId').isUUID(),
  param('roomId').isUUID(),
  roomsController.postBookRoom
)

module.exports = router
