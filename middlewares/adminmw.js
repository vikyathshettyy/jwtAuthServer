const {jwtkey} = require('../configs');
const jwt = require('jsonwebtoken');

function adminMiddleware(req,res,next) {
    const bearertoken = req.headers.authorization;
    const token = bearertoken.split(' ')[1];
    try{
        const admin = jwt.verify(token,jwtkey);
        if(admin.username){
            console.log(admin.username);
            req.username = admin.username;
            next();

        }
        else{
            console.log(admin);
        }
    }
    catch(e){
        console.log(e.message);
        res.status(403).send('wrong token')
    }
}
module.exports = adminMiddleware;