"use strict";
const express = require("express");
const router = express.Router();

// controllers
const initialConfig = require("../controllers/settingsController/initialConfig");

router.post("/config", initialConfig);

module.exports = router;
