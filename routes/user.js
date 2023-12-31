const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {Users,Courses} = require('../db');
const {jwtkey} = require('../configs');
const userMiddleware = require('../middlewares/usermw')

router.post('/signup', async function(req,res) {
    try{
        const user = await Users.create({
            username: req.headers.username,
            password: req.headers.password,

        })
        res.json({
            message:'user created successfully'
        })

    }
    catch(e){
        console.log(e.message);
        res.status(500).send('internal server error');
    }

})

router.post('/signin',async function(req,res) {
    try{
        const user = await Users.findOne({
            username: req.headers.username,
            password: req.headers.password,
        })
        if(user)
        {
            const token = jwt.sign(user.username,jwtkey);
            res.json({
                token: token,
            })
        }
        else{
            res.status(403).send("user doesn't exist/wrong credentials");
        }
    }
    catch(e){
        console.log(e.message);
        res.status(500).send({
            message: 'internal server error',
        })
    }
})

router.get('/courses', userMiddleware, async function(req,res) {
    try{
        const courses = await Courses.find({}).populate('adminid','username');
        res.json(courses);
    }
    catch(e){
        console.log(e.message);
        res.status(500).send()        
    }
})

router.post('/courses/:courseId', userMiddleware, async function(req,res) {
    try{
        await Users.updateOne({ username: req.username}, {$push: {courses: req.params.courseId}});
        res.json({
            message: 'course purchased successfully',
        })
    }
    catch(e){
        res.status(500).send('internal server error');
    }
})

router.get('/courses/purchasedCourses', userMiddleware, async function(req,res) {
    const cours = await Users.findOne({username: req.username}).populate('courses');
    res.json(cours.courses);
})



module.exports = router;