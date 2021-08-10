const express = require("express");

const user = require("./userRoute");
const documents = require("./documentsRoute");

const router = express.Router();

router.use("/user", user);
router.use("/documents", documents);

module.exports = router;
