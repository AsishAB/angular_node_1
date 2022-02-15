const express = require('express');

const router = express.Router();


const UserController  = require("../controllers/user-controller");
const multerMiddleware = require('../middleware/multer-middleware');



// const app = express();

// const path = require("path");
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());


router.post('/register-user', multerMiddleware("profile") , UserController.registerUser);

router.get("/get-user-by-id/:id",UserController.getUserById);

module.exports = router;