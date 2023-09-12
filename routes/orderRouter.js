const Router = require('express')
const router = new Router()
const ordersController = require('../controllers/Orders')
const { body } = require('express-validator')

router.delete(
  '/',
  body(['userId', 'orderId']).isUUID(),
  ordersController.deleteOrder
)

module.exports = router
