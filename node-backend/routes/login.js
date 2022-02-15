const express = require("express");

const router = express.Router();
const app = express();

const path = require("path");


const UserController = require("../controllers/login-controller");



router.post('/loginUser', UserController.loginUser);

module.exports = router;


        
    


