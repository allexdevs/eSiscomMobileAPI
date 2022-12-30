"use strict";
const express = require("express");
const router = express.Router();

// controllers
const searchZipCode = require("../controllers/addressController/searchZipCode");
const consultAddress = require("../controllers/addressController/consultAddress");
const listCounties = require("../controllers/addressController/listCounties");

router.get("/searchZipCode", searchZipCode);
router.get("/consultAddress", consultAddress);
router.get("/listCounties", listCounties);

module.exports = router;
