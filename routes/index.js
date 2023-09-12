const Router = require('express')
const router = new Router()

const orderRouter = require('./orderRouter')
const roomRouter = require('./roomRouter')

router.use('/orders', orderRouter)
router.use('/rooms', roomRouter)

module.exports = router
