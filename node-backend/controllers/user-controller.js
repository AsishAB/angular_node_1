const argon2 = require('argon2');

const db = require("../db/server");


exports.registerUser = async (req, res, next) => {
    var message="";
    var response = '';
    const user = req.body;
    
    //console.log(user.TUM_Password);
   

    user.TUM_Password =  await argon2.hash(user.TUM_Password,{
            type: argon2.argon2i,
            memoryCost: 2 ** 16,
            hashLength: 50,
         });
       
        //console.log("Password = "+user.TUM_Password);return;
       
    const files = req.files[0];
    var dest1 = '';
    var dest2 = '';
    var  file_name =null;
    if(files !==undefined || files !=null) {
         dest1 = files.destination.split('/');
         dest2 = dest1[1];
         file_name = dest2+"/"+files.filename;
    
    }
    var uniqueUser = true;
    var query = `SELECT * FROM tbl_users WHERE TUM_Email=$1`;
  
    var values = [user.TUM_Email];
    
   await db.query(query,values)
            .then(result => {
                if(result.rowCount > 0) {
                    uniqueUser = false;
                    
                    response= 'fail';
                    message= 'User with the given email id already exists. Please enter a new user id/email id and try again';
                }
                
            })
            .catch(err => {
                response= 'fail';
                message= 'User could not be added. Error in the server. Please try again, or if the issue persists, contact an admin';
                uniqueUser=false;
            })
            .finally(() => {
                queryNewUser = `INSERT INTO  tbl_users
                            (TUM_First_Name,TUM_Last_Name,TUM_Gender,TUM_Email,TUM_Password,TUM_Mobile,TUM_Country,TUM_State,TUM_City,TUM_Profile_Pic) 
                            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
                valuesNewUser = [
                                user.TUM_First_Name,
                                user.TUM_Last_Name,
                                user.TUM_Gender,
                                
                                user.TUM_Email,
                                user.TUM_Password,
                                user.TUM_Mobile,
                                user.TUM_Country,
                                user.TUM_State,
                                user.TUM_City,
                                
                                file_name
                            ]
                if(uniqueUser) {
                    try {
                        db.query(queryNewUser, valuesNewUser)
                        response = 'success';
                        message="User Added Successfully.";   
                    } catch(err) {
                        response = 'fail';
                        message="User could not be added. Error in the server";
                    }
                    
                          
                }
                
                const josn_resp = {
                    response: response,
                    message:message
                }
                //console.log(josn_resp)
                res.json(josn_resp);
            });
    
    
}

exports.getUserById = async (req, res, next) => {
    await db.query(`SELECT * from tbl_users where tum_id=$1`,[req.params.id], (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result.rows);
    });

}