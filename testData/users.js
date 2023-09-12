const uuid = require('uuid')

const usersData = [
  {
    id: uuid.v4(),
    vip: false,
  },
  {
    id: uuid.v4(),
    vip: true,
  },
  {
    id: uuid.v4(),
    vip: false,
  },
  {
    id: uuid.v4(),
    vip: true,
  },
  {
    id: uuid.v4(),
    vip: false,
  },
]

module.exports = { usersData }
