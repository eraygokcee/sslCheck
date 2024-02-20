const client = require("../config/config");

const uuid = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
client.query(uuid);
client.query(createTableQuery).then( ()=>{
    console.log("Schema has been created1.")
});

module.exports = client;
