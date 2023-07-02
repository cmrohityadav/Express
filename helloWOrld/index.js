const express=require('express');

const app=express();

const port=4010;
const hostName="loclahost"


app.get('/',(req,res)=>{

    res.send("Hello World");
})

app.get('/about',(req,res)=>{
    res.send("About Page");
})

app.get('/contact',(req,res)=>{
    res.send("Contact Page");
})

app.listen(port,()=>{
    console.log(`Server running at ${hostName}:${port}`);
});
