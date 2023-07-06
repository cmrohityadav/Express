const userModel = require("../model/userSchema");
const emailValidator=require('email-validator')

const signup= async(req,res,nexxt)=>{
    const {name,email,password,confirmPassword}=req.body;
    console.log(name,email,password,confirmPassword);
    

    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
            success:false,
            message:'every field is required'
        })
    }

    //email validator
 const validEmail=emailValidator.validate(email);
  if(! validEmail){
    return res.status(400).json({
        success:false,
        message:'please provide a valid eamail id'
    })

  }


  if(password !==confirmPassword){
    return res.status(400).json({
        success:false,
        message:'confirm password not matching to password'
    })
  }

   try {
    const userInfo=userModel(req.body);
    const result=await userInfo.save();
    



 return res.status(200).json({
    sucess:true,
    data:result
 })
    
   } catch (error) {
        if(error.code===11000){
            return res.status(400).json({
                sucess:false,
                message:"account already exists with provided email"
             })
        }
        return res.status(400).json({
            sucess:false,
            message:e.message
         })
     
   }
}

//
const signin=()=>{


}


module.exports={
    signup
}