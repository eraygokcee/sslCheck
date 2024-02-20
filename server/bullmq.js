const redisConnection = require('./redis-connection');
var nodemailer = require("nodemailer");
const excelJs = require("exceljs");
const client = require("./models/sslQueryModel");


const { Queue, Worker } = require('bullmq');

const sslQueryQueue = new Queue('sslQuery', { connection: redisConnection });

const sslQueryWorker = new Worker('sslQuery', async job => {
    const { row_ID } = job.data;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: "eraygokce39@gmail.com",
        pass: "kohcwoyrwcnqxahb",
      },
    });
    try {
      const result = await client.query(`SELECT * FROM sslQuery WHERE id = $1`, [row_ID.id]);
      const workbook = new excelJs.Workbook();
      const worksheet = workbook.addWorksheet("My Users");
      // Column headers
      worksheet.columns = [
        { header: "URL", key: "url", width: 20 },
        { header: "Remaining Days", key: "daysremaining", width: 7 },
        { header: "Valid From", key: "validfrom", width: 22 },
        { header: "Valid To", key: "validto", width: 22 },
        { header: "Query Created At", key: "query_created_at", width: 9 },
      ];
      for (let i = 0; i < result.rowCount; i++) {
        worksheet.addRow(result.rows[i]);
      }
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      await workbook.xlsx.writeFile(`./files/${row_ID.id}.xlsx`);
      // Mail gönderme işlemi
      const receiverMail = await client.query(`SELECT DISTINCT email FROM Users WHERE id = $1`, [row_ID.id]);
      await transporter.sendMail({
        from: "eraygokce39@gmail.com",
        to: `${receiverMail.rows[0].email}`,
        subject: "Query Results",
        text: "Bura text ksımABURANADNASJDASJDKASDJNJAı",
        attachments: [{ filename: `${row_ID.id}.xlsx`, path: `./files/${row_ID.id}.xlsx` }]
      });
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  },{connection: redisConnection});

  const sqlQuery = new Queue('sqlQuery', { connection: redisConnection });
  const sqlQueryWorker = new Worker('sqlQuery',async job=>{
    
  },{ connection: redisConnection })


  module.exports = {sslQueryQueue,sslQueryWorker,sqlQuery,sqlQueryWorker};
  