const client = require("../models/sslQueryModel");
var sslChecker = require("ssl-checker");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const {sslQueryQueue} =require("../bullmq");

const sslCheck = asyncHandler(async () => {
  //result.rows[i].id
  const resultDB = await client.query(`SELECT url,id FROM sslTable`);
  for (const row of resultDB.rows) {
    // counter++;
    try {
      const result = await sslChecker(row.url, 'GET', 443);
      await client.query(`INSERT INTO sslQuery (url,daysRemaining,validFrom,validTo,id) VALUES ($1,$2,$3,$4,$5)`, [row.url, result.daysRemaining, result.validFrom, result.validTo, row.id]);
    } catch (error) {
      if (error.message.startsWith('No certificate')) {
        console.error("Sertifikası Yok");
        await client.query(`INSERT INTO sslQuery (id,url,daysRemaining,validFrom,validTo) VALUES($1,$2,0,0,0)`, [row.id, row.url]);
      }
      else if (error.code.startsWith('ENOTFOUND')) {
        await client.query(`INSERT INTO sslQuery (id,url,daysRemaining,validFrom,validTo) VALUES ($1,$2,-1,-1,-1)`, [row.id, row.url]);
        console.error("Böyle bir adres yok");
      }
      else {
        console.error(error);
      }
    }
  }
});

const exportSslQuery = async (req, res) => {
  try {
    const resultID = await client.query(`SELECT DISTINCT id FROM sslQuery`);
    for (const row_ID of resultID.rows) {
      const jobData = {
        row_ID,
      };
      await sslQueryQueue.add('sendMail', jobData);
    }
  } catch (error) {
    console.error(error);
  }
};

const getSslQuery = async (req, res) => {
  const id = req.user.id;
  const resultDB = await client.query(`SELECT url,daysremaining,validfrom,validto FROM sslquery WHERE id = $1`, [id]);
  console.log(resultDB.rows);
  res.json(resultDB.rows);
}

module.exports = { sslCheck, exportSslQuery, getSslQuery };
