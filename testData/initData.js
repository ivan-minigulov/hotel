const { Users, Rooms } = require('../models/models')
const { usersData } = require('./users')
const { roomsData } = require('./rooms')

async function initData() {
  try {
    usersData.forEach(async (user) => {
      const { id, vip } = user
      await Users.create({ id, vip })
    })
    roomsData.forEach(async (room) => {
      const { id, typeRoom, numberRoom } = room
      await Rooms.create({ id, typeRoom, numberRoom })
    })
  } catch (e) {
    console.log(e)
  }
}

module.exports = { initData }
