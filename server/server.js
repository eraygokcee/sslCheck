const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const app = express();
const client = require("./config/config");
var cron = require('node-cron');
var {sslCheck,exportSslQuery} = require("./controllers/sslQueryController");
const cors = require('cors');
const cookieParser = require('cookie-parser');



app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["POST","GET"],
    credentials : true
}));
app.use(cookieParser());
app.use(express.static('public'));

//app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/ssl",require("./routes/sslRoutes"));

app.use(errorHandler);



cron.schedule('*/15 * * * * * ', async () => {
    await sslCheck();
    await exportSslQuery();
})




app.listen(process.env.PORT || 5000,() =>{
    console.log(`Server running at ${port} port`);
})  