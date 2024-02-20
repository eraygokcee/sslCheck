const client = require("../config/config");

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS sslQuery (
    id UUID,
    url VARCHAR(255) NOT NULL,
    daysRemaining INTEGER NOT NULL,
    validFrom VARCHAR(255),
    validTo VARCHAR(255),
    query_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES Users(id)
  )
`;

client.query(createTableQuery).then (()=>{
    console.log("Schema has been creted.4");
});

module.exports = client;