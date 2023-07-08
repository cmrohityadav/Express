const express=require('express');
const app=express();

const authRouter=require('./router/authRouter.js');
const databaseconnect = require('./config/database.js');
const cookieParser=require('cookie-parser');
databaseconnect();
app.use(cookieParser());

app.use(express.json())
app.use('/api/auth/',authRouter);

app.use('/',(req,res)=>{

    res.status(200).json({
        data:"JWTauth Server started",
        name:"Rohit Yadav"
        
    })

});

module.exports=app;