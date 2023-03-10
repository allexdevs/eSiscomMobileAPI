"use strict";
const express = require("express");
const router = express.Router();

// controllers
const authenticateUser = require("../controllers/loginController/authenticateUser");

router.get("/login", authenticateUser);

module.exports = router;
