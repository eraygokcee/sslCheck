
const client = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username);
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Veriler Bos Olamaz");
    };
    const result = await client.query(`SELECT id FROM users WHERE email = $1`, [email]);
    if (result.rows.length > 0) {
        res.status(400);
        throw new Error("Kayıtlı E-Mail Var");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await client.query(`INSERT INTO users (username,email,password) VALUES ($1,$2,$3)`, [username, email, hashedPassword], (err, result) => {
        if (err) {
            res.status(400);
            throw (err);
        }
    });
    console.log("Kayıt başarili");
    return res.status(201).json("Kayıt Basarili");


});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Veriler bos olamaz.");
    }
    const pass = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (!pass) {
        res.status(400);
        throw new Error("E Mail Kayıtlı Değil");
    }

    if (await bcrypt.compare(password, pass.rows[0].password)) {
        const accessToken = jwt.sign(
            {
                user: {
                    email: email,
                    username: pass.rows[0].username,
                    id: pass.rows[0].id,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        res.cookie('token',accessToken).status(200).json(accessToken);
    } else {
        res.status(401);
        throw new Error("Kullanici Adi veya Parola Yanlis");
    };
});

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
};