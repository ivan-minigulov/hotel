require('dotenv').config()
const express = require('express')
const sequelize = require('./db/db')
const errorMiddleware = require('./middleware/error')
const router = require('./routes/index')
const { initData } = require('./testData/initData')

const PORT = process.env.PORT || 5000
const initTestData = process.env.INIT_TEST_DATA || false
const app = express()

app.use(express.json())
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    if (initTestData) {
      await initData()
    } else {
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }
  } catch (e) {
    console.log(e)
  }
}

start()
