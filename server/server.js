const assert = require('assert');
const newrelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const Restaurant = require('../database/schema.js');

const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost', 'localhost'],
  localDataCenter: 'datacenter1', keyspace: 'restaurants'
});

// client.connect(function (err) {
//   assert.ifError(err);
// });

client.connect(function (err) {});

const app = express();
const port = 1408;


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

// app.get('/api/restaurants/:restaurantID', (req, res) => {
//   const restId = req.params.restaurantID;
//   Restaurant.findOne({ id: restId }).lean()
//     .then((doc) => {
//       res.send(doc);
//     })
//     .catch((err) => {
//       console.log('Error finding restaurant in database: ', err);
//     });
// });

app.get('/api/restaurants/:restaurantID', (req, res) => {
  const restId = req.params.restaurantID;
  const query = `SELECT * FROM restaurants WHERE id = ${restId}` ;
  client.execute(query, function (err, result) {
    let doc = result.first();

    // console.log(doc.articles);
    res.send(doc);
  });
});

app.get('/api/articles/:articleID', (req, res) => {
  let artId = req.params.articleID;
  const query = `SELECT * FROM articles WHERE id = '${artId}'` ;
  client.execute(query, function (err, result) {
    let doc = result.first();
    res.send(doc);
  });
});

app.post('/api/restaurants/', (req, res) => {
  // console.log('req: ', req.body);
  Restaurant.create(req.body)
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log('Error creating restaurant in database: ', err);
    });
  res.end();
});

app.put('/api/restaurants/:restaurantID', (req, res) => {
  const restId = req.params.restaurantID;
  Restaurant.updateOne({ id: restId }, req.body)
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log('Error updating restaurant in database: ', err);
    });
});

app.delete('/api/restaurants/:restaurantID', (req, res) => {
  const restId = parseInt(req.params.restaurantID, 10);
  Restaurant.deleteOne({ id: restId }).lean()
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log('Error deleting restaurant from database: ', err);
    });
});

app.delete('/api/deleteAll', (req, res) => {
  Restaurant.deleteMany({})
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log('Error deleting restaurant from database: ', err);
    });
});
