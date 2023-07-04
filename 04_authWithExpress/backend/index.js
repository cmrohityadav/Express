const PORT=process.env.PORT || 5000;

const app=require('./app.js')

app.listen(PORT,()=>{
    console.log(`Server listening on port http://localhost:${PORT}...`)
})