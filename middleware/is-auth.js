//Import Packages
const jwt = require('jsonwebtoken');

//Import helper functions
const { throwError } = require("../util/hellper");

module.exports = (req, res, next) => {
    //check if token authenticated
    const authHeader = req.get('Authorization');
    if(!authHeader){
        throwError('Not authenticated.',401);
    }

    //Get Token to compare
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    //Try to authenticate token 
    try{
        decodedToken = jwt.verify(token,'PassCode');
    }catch(err) {
        throwError('Could not authenticate',500);
    }
    //check if token could authenticate
    if (!decodedToken){
        throwError('Not authenticated.',401);
    }

    //Set req id = token id
    req.userId = decodedToken.userId;

    //Continue with code
    next();
}