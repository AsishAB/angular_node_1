const db = require("../db/server");
const jwt = require('jsonwebtoken');


exports.getAllPosts = (req, res, next) => {
    //console.log(req.userData);
    const userId = req.userData.userId;
    
    const all_todos = db.query("SELECT * FROM master_todo('getAllTodo','"+userId+"')", (err, result) => {
        if(err){
            console.log(err)
        }
        res.send(result.rows)
        
    });
}

exports.getPostById = async (req,res,next) => {

        
    const p_id = req.params.id;
    //     const actionValue = 'SET p_todo_id='+req.params.id;
    await db.query(`SELECT * FROM todo_list WHERE todo_id = $1 `, [p_id], (err, result) => {
    // db.query("SELECT * FROM master_todo('editTodo',"+actionValue+")", (err, result) => {
        if(err) {
            console.log(err)
        }
        res.send(result.rows)
    });
}

exports.add_edit_post = async (req, res, next) => {
    const data = req.body;
   
    const fnt_file = req.files[0];
    
    //console.log(file)
    var file_name = '';
    
    var message = "";
    var response = "success";

    if(fnt_file !==undefined || fnt_file !=null) {
        var  file_name = fnt_file.destination+fnt_file.filename;
    }
    
    if(data.todo_id == 0) {
        //console.log("INSERT QUERY")
       await db.query(`INSERT INTO todo_list(todo_title, todo_description, todo_status, todo_image,todo_created_by) VALUES($1,$2,$3,$4,$5)`,[data.todo_title,data.todo_description, 1,file_name,req.userData.userId], (err, result) => {
            if(err){
                response = "fail";
                console.log(err);
            }

        })

    } else {
        //console.log("UPDATE QUERY")

        var updateQuery = `UPDATE todo_list SET todo_title=$1, todo_description=$2, todo_status=$3,todo_updated_by=$5 `;
        var values = [data.todo_title,data.todo_description,1,data.todo_id,req.userData.userId]
       
        if(fnt_file !==undefined || fnt_file !=null) {
        
            updateQuery+=`,todo_image=$6`
            values.push(file_name)

        }
            
        updateQuery+=` WHERE todo_id = $4`;
        
        //db.query(`UPDATE todo_list SET todo_title=$1, todo_description=$2, todo_status=$3, todo_image=$5 WHERE todo_id = $4`,[data.todo_title,data.todo_description, 1,file_name], (err, result) => {
        await db.query(updateQuery,values, (err, result) => {
           if(err){
                response = "fail";
                console.log(err);
            }

        })
    }
    if(data.todo_id == 0) {
        message = "Todo Added Successfully";
    } else {
        message = "Todo Edited Successfully";
    }
   const json_object = {
        response:response,
        message: message
    }

    res.json(json_object);
}

exports.deletePost = (req, res, next) => {
    const id=  req.params.id;
    var message="Todo Deleted Successfully";
    var response = 'success';
    db.query(`DELETE FROM todo_list WHERE todo_id=$1`,[id], (err, result) => {
        if(err) {
            response='fail';
            message=" Error in deleting Todo. Please try again later";
            console.log(err);
        }
    });

    const json_object = {
        response: response,
        message: message
    }
    res.json(json_object);
}

exports.markAsDone = (req, res, next) => {
    const id = req.params.id;
    var message="Todo Marked as Done";
    var response = 'success';
    db.query(`UPDATE todo_list SET todo_status=$1 WHERE todo_id=$2`,[0,id], (err, result) => {
        if(err) {
            response='fail';
            message=" Error in deleting Todo. Please try again later";
            console.log(err);   
        }
    });
    const json_object = {
        response: response,
        message: message
    }
    res.json(json_object);
}

exports.deleteAllPosts = (req, res, next) => {
    var message="All Todos Deleted";
    var response = 'success';
    db.query(`TRUNCATE  TABLE todo_list`, (err, result) => {
        if(err) {
            response='fail';
            message=" Error in deleting Todo. Please try again later";
            console.log(err);  
        }
    });
    const json_object = {
        response: response,
        message: message
    }
    res.json(json_object);
}