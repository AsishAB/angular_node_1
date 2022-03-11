const db = require("../db/server");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');


exports.loginUser = async (req, res, next) => {
    const loginDetails  = req.body;
    //console.log(loginDetails);
    var { userId, stored_password,userEmailId,token,status_code } = '';
    var message = '';
    var response = '';
    //console.log(loginDetails);
    query = `SELECT * FROM tbl_users WHERE (tum_email = $1 OR tum_mobile = $1)`;
    params = [loginDetails.username];

    // await db.query(query, params, (err, result) => {
    //     if(err) {
    //         console.log(err);
    //         response = 'f0';
    //         message = "Internal Server Error. Please reload the page and try again.";
    //     } else if(result.rows.length) {
    //         //console.log(result.rows.length);
    //         userId = result.rows[0].tum_email;
    //         password = result.rows[0].tum_password;
    //         response = 's1';
    //         message = ""; 
    //     } else {
    //         response = 'f1';
    //         message = "User with the given user id does not exist. Please register here";
    //     }
        
    // });
    try {
            const result = await db.query(query, params);
            if(result.rowCount == 0 ) {
                response = 'f1';
                message = "User with the given user id does not exist. Please register here";
            } else {
                userId = result.rows[0].tum_id;
                userEmailId = result.rows[0].tum_email;
                stored_password = result.rows[0].tum_password;
                
                try {
                    if ((await argon2.verify(stored_password, loginDetails.password))) {
                       
                        //password matches
                        response = 'success';
                        const session_data = {
                            userId: userId,
                            email: userEmailId
                        }
                        token = jwt.sign(session_data, process.env.SECRET_TOKEN, {expiresIn:'1hr'});
                        
                        //console.log(token);

                    } else { 
                        response = 'f2';
                        message = "Entered password is wrong. Please enter the correct password, or reset it";
                    }

                    


                  } catch (err) {
                      console.log(err);
                    response = 'f0';
                    message = "Internal Server Error. Please reload the page and try again, or contact an Administrator";
                  } 
            }
    } catch (err) {
        console.log(err);
        response = 'f0';
        message = "Internal Server Error. Please reload the page and try again, or contact an Administrator";
    }
    

    const json_object = {
        token: token,
        response: response,
        message:message,
        expiresIn: response != 'success' ? '' : 3600,  //(1 hr converted to minutes. expiresIn is used in jwt.sign())
        userId: response != 'success' ? '' : userId  //Token contains the user id, but decoding it will be extra burden on the app
    }
    
    if(token != '' && response == 'success') {
        status_code = 200;
       
    } else if(response != 'success')  {
        
        status_code = 401;
    } else {
       
        status_code = 500;
    } 

    
//    if(token != '') {
//         status_code = 200;
       
//     } else {
       
//         status_code = 500;
//     } 
    
    res.status(status_code).json(json_object);
    //console.log("Status = "+status_code+" response = "+response+" & message = "+ message);
}