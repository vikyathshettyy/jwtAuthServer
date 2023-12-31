const {jwtkey} = require('../configs')
const jwt = require('jsonwebtoken');

function userMiddleware(req,res,next) {
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1];
    try{
        const decoded = jwt.verify(token,jwtkey);
        if(decoded){
            req.username = decoded;
            next();
        }
        else{
            console.log(decoded);
        }

    }
    catch(e){
        console.log(e.message);

        res.status(403).send('wrong token');
    }
}

module.exports = userMiddleware;