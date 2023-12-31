const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:Vikyath%401964@cluster0.owmhwku.mongodb.net/CourseSellingApp')


const adminSchema = mongoose.Schema({
    username: String,
    password: String,

})

const Admins = mongoose.model('Admins', adminSchema);

const courseSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    adminid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Admins,
    }
    
})

const Courses = mongoose.model('Courses',courseSchema);

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    courses: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: Courses,
    }]
})

const Users = mongoose.model('Users',userSchema);

module.exports = { Admins, Courses, Users };