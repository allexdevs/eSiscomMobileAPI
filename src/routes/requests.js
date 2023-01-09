"use strict";
const express = require("express");
const router = express.Router();

// controllers
const add = require("../controllers/requestsController/add");

router.post("/add", add);

module.exports = router;
