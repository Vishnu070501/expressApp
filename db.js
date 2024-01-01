// const mysql = require('mysql2');
const { Sequelize } = require('sequelize');


// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'book_your_tickets',
//   port: 3306,
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// const sequelize = new Sequelize('book_your_tickets', 'root', 'root', {
//   host: 'localhost',
//   dialect: 'mysql',
// });
const sequelize = new Sequelize({
  // Your database configuration options
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'book_your_tickets',
});



// module.exports = connection;
module.exports = sequelize;
