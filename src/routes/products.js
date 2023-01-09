"use strict";
const express = require("express");
const router = express.Router();

// controllers
const findAll = require("../controllers/productsController/findAll");
const findById = require("../controllers/productsController/findById");
const findByName = require("../controllers/productsController/findByName");
const addProduct = require("../controllers/productsController/addProduct");
const update = require("../controllers/productsController/update");
const deleteProduct = require("../controllers/productsController/delete");

// routes
router.get("/findAll", findAll);
router.get("/findById/:id", findById);
router.get("/findByName/:name", findByName);
router.post("/add", addProduct);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
