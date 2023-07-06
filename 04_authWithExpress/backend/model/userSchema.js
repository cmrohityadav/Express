const mongoose=require('mongoose')

const { Schema}=mongoose;
const userSchema=new Schema({
 name:{
    type:String,
    required:[true,'user name is Required'],
    minLength:[5,'Name must be at least 5 char'],
    maxLength:[50,'name must be less than 50 char'],
    trim:true
 },
 email:{
    type:String,
    required:[true,'user email is Required'],
    unique:true,
    lowercase:true,
    unique:[true, "already registered"]

 },
 password:{
    type:String,
    select:false
 },
 forgotPasswordToken:{
    type:String
 },
 forgotPasswordExpiryDate:{
    type:String
 },
//  timestamps: true


})

const userModel=mongoose.model('user',userSchema); //user ki entry db me jayegi,konsa schmea use kr rh hu
module.exports=userModel;

