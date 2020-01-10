// eslint-disable-next-line no-unused-vars
const newrelic = require('newrelic');
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');
const client = require('./postgres.js');

const app = express();
const port = 3003;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/:restaurantID', express.static(path.join(__dirname, '..', 'public')));

app.get('/api/postgres/articles/:restaurantID', (req, res) => {
  const restId = req.params.restaurantID;
  const query = 'SELECT image, title FROM articles, restaurants '
              + `WHERE articles.id = restaurants.article AND restaurants.id = '${restId}'`;
  client.query(query, (error, results) => {
    // console.log(results.rows);
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// app.post('/api/restaurants/', (req, res) => {
//   // console.log('req: ', req.body);
//   Restaurant.create(req.body)
//     .then(() => {
//       res.end();
//     })
//     .catch((err) => {
//       console.log('Error creating restaurant in database: ', err);
//     });
//   res.end();
// });

// app.put('/api/restaurants/:restaurantID', (req, res) => {
//   const restId = req.params.restaurantID;
//   Restaurant.updateOne({ id: restId }, req.body)
//     .then(() => {
//       res.end();
//     })
//     .catch((err) => {
//       console.log('Error updating restaurant in database: ', err);
//     });
// });

// app.delete('/api/restaurants/:restaurantID', (req, res) => {
//   const restId = parseInt(req.params.restaurantID, 10);
//   Restaurant.deleteOne({ id: restId }).lean()
//     .then(() => {
//       res.end();
//     })
//     .catch((err) => {
//       console.log('Error deleting restaurant from database: ', err);
//     });
// });

// app.delete('/api/deleteAll', (req, res) => {
//   Restaurant.deleteMany({})
//     .then(() => {
//       res.end();
//     })
//     .catch((err) => {
//       console.log('Error deleting restaurant from database: ', err);
//     });
// });

app.listen(port, () => { console.log(`Listening on port ${port}...`); });
