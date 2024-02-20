const client = require("../config/config");

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS sslTable (
    id UUID,
    url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES Users(id)
  )
`;
client.query(createTableQuery).then( ()=>{
    console.log("Schema has been created.3");
});

module.exports = client;
