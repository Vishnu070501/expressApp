// models/show.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Import your sequelize instance correctly

const Show = sequelize.define('Show', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  movieName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'movie_name', // Specify the actual column name in the database
  },
  showDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'show_date', // Specify the actual column name in the database
  },
  showTime: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'show_time', // Specify the actual column name in the database
  },
  
}, {
  tableName: 'shows', // Specify the actual table name in the database
  // timestamps: true, // Sequelize will automatically manage createdAt and updatedAt columns
  timestamps: false, // Disable automatic timestamps
});

module.exports = Show;

