const uuid = require('uuid')

const roomsData = [
  {
    id: uuid.v4(),
    typeRoom: 'Эконом 1',
    numberRoom: '1',
  },
  {
    id: uuid.v4(),
    typeRoom: 'Эконом 2',
    numberRoom: '2',
  },
  {
    id: uuid.v4(),
    typeRoom: 'Эконом 2',
    numberRoom: '3',
  },
  {
    id: uuid.v4(),
    typeRoom: 'Premium 2',
    numberRoom: '4',
  },
  {
    id: uuid.v4(),
    typeRoom: 'Premium 3',
    numberRoom: '5',
  },
]

module.exports = { roomsData }
