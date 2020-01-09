const { Client } = require('pg');
const pass = require('./postgresPass.js');

const connectionString = `postgres://postgres:${pass.password}@localhost:5432/postgres`;
const client = new Client({
  connectionString,
});

client.connect();

module.exports = client;
