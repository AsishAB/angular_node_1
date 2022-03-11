const express = require("express");

const router = express.Router();
const app = express();

const path = require("path");
// const db = require("../db/server");
const multer = require("multer");
// const jwt = require('jsonwebtoken');
const checkAuth = require("../middleware/check-auth");
const multerMiddleware = require("../middleware/multer-middleware");
const PostController = require("../controllers/post-controller");

// const storage =  multer.diskStorage({
//     destination:(req, file, cb) => {
//         cb(null, "storage/file_uploads/")
//     },
//     filename: (req, file, cb) => {
//         let splitted_name = file.originalname.split(".");
//         let name1 = splitted_name[0].toLowerCase().split(" ").join("-");
//         let name2 = splitted_name[1].toLowerCase();

//         const full_file_name = name1+Date.now()+"."+name2;
//         cb(null, full_file_name);

//     }

// })


// const multer_file_upload = multer({storage: storage});




router.get('/api/get-all-todo',checkAuth,PostController.getAllPosts);

router.get('/api/get-todo-from-id/:id',checkAuth,PostController.getPostById);

router.post('/api/post-todo',checkAuth,multerMiddleware("posts"), PostController.add_edit_post);

router.delete('/api/delete-todo/:id',checkAuth, PostController.deletePost);

router.get('/api/mark-as-done/:id', PostController.markAsDone);


router.get('/api/delete-all-todos', PostController.deleteAllPosts);





module.exports = router;