const User = require("../Models/User");
const mailSender = require("../utils/mailSender");
const bcrypt=require('bcrypt')


const resetPassToken=async(req,res)=>{

    try{
            // get email from req ki body 
        const email=req.body.email ;
        // check user exists for this emial from DB 
        const user=await User.findOne({email}) ;
        if(!user) return res.json({success:false,message:'your email is not registeredt with us'})
        // generate token 

        const token=crypto.randomUUID() ;
        //update user by adding token and expiration time 
        const updatedDetails=await User.findOne({email:email},{token:token,resetPasswordExpires:Date.now()+5*60*1000},
        {new:true} ) // -> update document return in result 
        // create url for reset password -> send mail contianing url 
        const url=`http://localhost:3000/update-password/${token}`

        // send mail containing url for reseting password 
        await mailSender(email,"password reset link",`Password reset link ${url}`)

        // return response 
        return res.json({success:true,message:'email sent successfully please check email and change pass'})

    }catch(err){
         
        return res.status(500).json({success:false,message:'something went wrong while reset password '})
    }
    
}

const resetPassword=async(req,res)=>{

    try{
         // date fetch , validation (token,pass,confirmPass)
         // get user details of user  from DB using token
         // if not entry of user -> inavlid token 
        // token expiry time check 
        // hash pass to store in DB -> updated password return response simple
        
        const {password,confirmPassword,token}=req.body ;
        if(password!==confirmPassword){
            return res.json({success:false,message:"password not matching"})
        }

        const userDetails=await User.findOne({token:token})
        if(!userDetails){
            return res.json({success:false,message:"token is invalid"})
        }

        if(userDetails.resetPasswordExpires<Date.now()){
            return res.json({success:false,message:"token is expired plz regenerate your token"})
        }
        const hashPass=await bcrypt.hash(password,10) ;

        await User.findOne({token:token},{password:hashPass},{new:true})

        return res.status(200).json({success:true,message:'password reset successfully'})

    }catch(err){
        console.log(err) 
        return res.status(500).json({success:false,message:'something went wrong'})
    }
}

module.exports={resetPassToken,resetPassword}