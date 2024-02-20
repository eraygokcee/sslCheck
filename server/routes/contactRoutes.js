const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const {getContacts,createContact,updateContact,getContactID,deleteContact} = require("../controllers/contactController");


router.use(validateToken);
router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContactID).put(updateContact).delete(deleteContact);

module.exports = router;