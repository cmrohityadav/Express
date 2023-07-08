const userModel = require("../model/userSchema");
const emailValidator=require('email-validator')
const bcrypt=require('bcrypt')
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
            message:error.message
         })
     
   }
}

//signin
const signin=async(req,res)=>{
    const { email, password}=req.body
    
    if(!email || !password){
        return res.status(400).json({
            sucess:false,
            message:"every field is mandatory"
         })
    }

   try {
    const user=await userModel
    .findOne({
        email
    })
    .select('+password');

    // if(!user || user.password ===password){
    //     return res.status(400).json({
    //         sucess:false,
    //         message:"Invalid credentails"
    //      })
    // }

    if(!user || bcrypt.compare(password, user.password)){
        return res.status(400).json({
            sucess:false,
            message:"Invalid credentails"
         })
    }


    //token
    const token=user.jwtToken();
    user.password=undefined;
    const cookiesOption={
        maxAge:24*60*60*1000,
        httpOnly:true
    };

    res.cookie("token",token,cookiesOption);
    res.status(200).json({
        success:true,
        data: user
    })

    
   } catch (error) {

     res.status(400).json({
        success:false,
        data:error.message
   })
}


}

const getUser=async(req,res,next)=>{
    const userId=req.user.id;
    try {

        const user=await userModel.findById(userId)
        return res.status(200).json({
            success:true,
            data:user
        })
  
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
        
    }


}


//logout
const logout=(req,res)=>{

    try {
        const cookiesOption={
            expire:new Date(),
            httpOnly:true
        }
        res.cookie("token",null,cookiesOption);
        res.status(200).json({
            success:true,
            message:"LogOUT"
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:e.message

        })
        
    }
}


module.exports={
    signup,signin,getUser,logout
}