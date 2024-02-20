const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const createSSL = require("../controllers/sslController");
const { getSslQuery } = require("../controllers/sslQueryController");

router.use(validateToken);
router.post("/create",validateToken,createSSL);
router.get("/",validateToken,getSslQuery);

module.exports = router;