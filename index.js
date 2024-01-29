// const express = require('express');
// const Show = require('./models/show')
// // const path = require('path')
// const connection = require('./db');
// const app = express();
// const port = 3000;



// app.get('/about', async (req, res) => {
//     // res.sendFile(path.join(__dirname,'index.html'));
//     try {
//         const shows = await Show.findAll();
//         res.json(shows);
//       } catch (error) {
//         console.error('Error fetching shows:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
//   });
// // simple database connection which executes a query
//   app.get('/', (req, res) => {
//     connection.query('SELECT * FROM book_your_tickets.shows', (error, results, fields) => {
//       if (error) {
//         console.error('Error executing MySQL query:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//         return;
//       }
//       res.json(results);
//     });
//   });

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });
// index.js
const express = require('express');
const app = express();
const sequelize = require('./db');
const showsRouter = require('./routes/showController');
const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use('/shows', showsRouter);

// Sync the database models with the database
sequelize.sync().then(() => {
  console.log('Database synced');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
