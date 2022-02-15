const express = require('express');
const path = require('path');
const router = express.Router();
const ApiController = require("../controllers/api-calls-controller");

// const db = require('../db/server');
//const fetch = require("node-fetch");



router.get("/get-all-countries",ApiController.getAllCountries);

router.get("/get-all-states/:id",ApiController.getStatesFromCountries);

router.get("/get-all-cities/:id",ApiController.getAllCountries);



module.exports = router;