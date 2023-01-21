"use strict";
const express = require("express");
const router = express.Router();

// controllers
const add = require("../controllers/requestsController/add");
const findAll = require("../controllers/requestsController/findAll");

router.post("/add", add);
router.get("/findAll", findAll);

module.exports = router;
