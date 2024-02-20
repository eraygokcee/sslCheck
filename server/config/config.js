const { Client, Connection } = require('pg');
const dbConfig = {
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'nodejs',
  };

const client = new Client(dbConfig);

client.connect().then(() => {
  console.log("DataBase Connected");
});

module.exports = client;