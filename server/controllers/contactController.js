//get
//const client = require("../models/contactModel");
const asyncHandler = require("express-async-handler");

const getContacts = asyncHandler (async (req,res) =>{
    client.query(`SELECT * FROM contacts`,(error,result)=>{
        if(error){
            throw(error)
        }
        res.status(200).json(result.rows);
    });
});
//post
const createContact = asyncHandler(async (req,res) => {
    console.log("request body :",req.body);
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Veriler bos olamaz");
    }
    client.query(`INSERT INTO contacts (name,email,password) VALUES($1,$2,$3)`,[name,email,password]);
    res.status(201).json({message :"Create Contact"});
});
//put
const updateContact = asyncHandler(async (req,res) =>{
    const{name,email,password} =req.body;
    client.query(`UPDATE contacts SET name = $1,email = $2,password = $3 WHERE id=$4`,[name,email,password,req.params.id]);
    res.status(200).json({message:`Update Contact for ${req.params.id}`});
   
});
//get
const getContactID = asyncHandler(async (req,res) =>{
    client.query(`SELECT * FROM contacts WHERE id = $1`,[req.params.id],(err,result)=>{
        if(err){
            throw(err)
        }
        res.status(200).json(result.rows);
    });
});
//delete
const deleteContact = asyncHandler (async (req,res) =>{
    res.status(200).json({message: `Delete Contact for ${req.params.id}`});
});


module.exports = {
    getContacts,
    createContact,
    updateContact,
    getContactID,
    deleteContact
};