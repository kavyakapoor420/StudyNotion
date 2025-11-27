const User = require("../Models/User");
const mailSender = require("../utils/mailSender");
const bcrypt=require('bcryptjs')


// ResetPass token -> send link to email to update pass 
exports.resetPasswordToken=async(req ,res)=>{

    
    try{
        const {email}=req.body ;

        const user=await User.findOne({email})

        if(!user){
            return res.json({success:false,message:'your email is not registered with us'})
        }

        const token=crypto.randomUUID() 

        const updatedDetails=await User.findOneAndUpdate({email:email},{token:token,resetPasswordExpires:Date.now()+5*60*1000},{new:true})

        const url=`http://localhost:5173/update-password/${token}`

        await mailSender(email,"password reset link",`you can reset your pasword using this  link ${url}`)

        return res.json({success:true,message:'email sent successfully for resetting password',updatedDetails})

    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:'something went wrong while resetting password'})
    }
    
}

exports.resetPassword=async(req,res)=>{

    try{
          // get user detail data from db using token if not entr invalid token token time check hash pass then update pass 
          const {password,confirmPass,token}=req.body
          
          if(password!==confirmPass){
            return res.json({success:false,message:'password not matching'})
          }

          const userDetail=await User.findOne({token:token})

          if(!userDetail){
            return res.json({success:false,message:"token is invalid"})
          }

          // token time check if expired 
          if(userDetail.resetPasswordExpires< Date.now()){
             return res.json({success:false,message:'token is expired'})
          }

          const hashehdPass=await bcrypt.hash(password,10)

          await User.findOneAndUpdate(
            {token:token},{password:hashehdPass},{new:true}
          )

          return res.status(200).json({success:true,message:'password reset successfully'})
    }catch(err){
return res.status(500).json({success:false,message:'password reset failed'})
    }
}

