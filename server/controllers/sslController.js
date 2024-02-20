const client = require("../models/sslModel");
const asyncHandler = require("express-async-handler");

const createSSL = asyncHandler ( async(req,res)=>{
    const id = req.user.id;
    const url = req.body.url;
    if(!url){
        res.status(400);
        throw new Error("Veriler Bos olamaz");
    }
    const result = await client.query(`SELECT url FROM sslTable WHERE url = $1 AND id =$2`,[url,id]);

    if(result.rows.length > 0){
        res.status(400);
        throw new Error("Kayıtlı Kullanici Tarafından URL var");
    }

    await client.query(`INSERT INTO sslTable (id,url) VALUES ($1,$2)`,[id,url],(err,result)=>{
        if(err){
            res.status(400);
            throw(err);
        }
        res.status(201).json("Kayıt Basarili");
    });
});





module.exports = createSSL;