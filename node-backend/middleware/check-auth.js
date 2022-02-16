const jwt = require('jsonwebtoken');
// const s_token = require('../tokens/auth-token');

//const authFunction = (req, res, next) => {

module.exports = (req, res, next) => {
    //console.log(req);
    var message = '';
    try {
        const token = req.headers.authorization;
        //console.log(token);
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        //console.log(decodedToken.email);
        req.userData = {email: decodedToken.email, userId: decodedToken.userId};
        next();

    } catch (err) {
        message = "Auth Failed";
        console.log(err); //JsonWebTokenError: Error jwt must be provided => user is not logged in
        res.status(401).json(message);

        // res.json(message); //Check the error message that occurs in browser console, while using this without status
    }
}


//module.exports = authFunction;