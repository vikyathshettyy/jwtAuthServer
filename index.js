const express = require('express')
const app = express()
//const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

//app.use('/user', userRouter)
app.use(express.json())
app.use("/admin", adminRouter);
app.use('/users',userRouter);

app.listen(3000,()=>{
    console.log("server listening at port 3000");
})

