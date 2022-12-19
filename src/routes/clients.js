"use strict";
const express = require("express");
const router = express.Router();

// controlles
const getClients = require("../controllers/clientsController/getClients");
const getClientById = require("../controllers/clientsController/getClientById");
const addClient = require("../controllers/clientsController/addClient");
const deleteClient = require("../controllers/clientsController/deleteClient");
const updateClient = require("../controllers/clientsController/updateClient");

// routes
router.get("/findAll", getClients);
router.get("/findById/:id", getClientById);
router.post("/add", addClient);
router.delete("/delete/:id", deleteClient);
router.put("/update/:id", updateClient);

module.exports = router;
