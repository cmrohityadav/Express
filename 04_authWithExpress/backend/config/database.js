const mongoose=require('mongoose');

const MONGODB_URL=process.env.MONGODB_URL

const databaseconnect=()=>{
mongoose
    .connect(MONGODB_URL)
    .then((conn)=> console.log(`connect to db: ${conn.connection.host}`))
    .catch((err)=> console.log(err.message))

}
module.exports=databaseconnect;