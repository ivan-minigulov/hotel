const sequelize = require('../db/db')
const { DataTypes } = require('sequelize')

const Users = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    vip: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  },
  {
    timestamps: false,
  }
)

const Rooms = sequelize.define(
  'room',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
    },
    typeRoom: { type: DataTypes.STRING, allowNull: false },
    numberRoom: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  {
    timestamps: false,
  }
)

const Orders = sequelize.define(
  'order',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
    },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
    vip: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    timestamps: false,
  }
)

Users.hasMany(Orders)
Orders.belongsTo(Users)

Rooms.hasMany(Orders, { as: 'orders' })
Orders.belongsTo(Rooms)

module.exports = {
  Users,
  Rooms,
  Orders,
}
