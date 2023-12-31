const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {jwtkey} = require('../configs');
const {Admins, Courses} = require('../db');
const adminMiddleware = require('../middlewares/adminmw');


router.post('/signup', (req,res) => {
    const username = req.headers.username;
    const password = req.headers.password;
    try{
        const newadmin = Admins.create({
            username:username,
            password:password,
        })
        res.json({
            message: "Admin created successfully",
        })
    }
    catch(e){
        console.log(e.message);
        res.status(500).send('internal server error');
    }

})

router.post('/signin', async function( req, res){
    const username = req.headers.username;
    const password = req.headers.password;

    try{
        const admin = await Admins.findOne({username: username, password: password});
        if(admin) {
            console.log(admin);
            const token = jwt.sign({username}, jwtkey );
            res.json({
                token: token,
            })

        }
        else{
            res.status(403).send('invalid credentials');
        }
    }
    catch(e){
        console.log(e.message);
        res.status(500).send('internal server error');
    }
    

})

router.post('/courses',adminMiddleware,async function(req,res){
    try{
        const admin = await Admins.findOne({username: req.username});
        
        

        
        const course = await Courses.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            imageLink:req.body.imageLink,
            adminid: admin._id,
        })
        res.json({
            message:'course created successfully',
            CourseId: course._id,
        })

    }
    catch(e){
        console.log(e.message);
        res.status(500).send('internal server error');
    }
})

router.get('/courses', adminMiddleware, async function(req,res) {
    try{
        const admin = await Admins.findOne({
            username: req.username
        })
        const adminid = admin._id;
        const courses = await Courses.find({
            adminid: adminid,
        })
        res.json(courses);
    }
    catch(e){
        console.log(e.message);
        res.status(500).send('server error');

    }
})

module.exports = router;