// models/ticket.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Show = require('./show');
const User = require('./user');

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  seatNo: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'seat_no',
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  showId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'show_id',
  },
  bookedBy: {
    type: DataTypes.STRING, // Assuming the type of bookedBy is STRING, adjust if necessary
    allowNull: true,
    field: 'booked_by',
  },
}, {
  tableName: 'tickets',
  timestamps: false,
});

// Define associations
Ticket.belongsTo(User, { foreignKey: 'bookedBy', onDelete: 'CASCADE' });
User.hasMany(Ticket, { foreignKey: 'bookedBy' });

Ticket.belongsTo(Show, { foreignKey: 'showId', onDelete: 'CASCADE' });
Show.hasMany(Ticket, { foreignKey: 'showId' });

module.exports = Ticket;
