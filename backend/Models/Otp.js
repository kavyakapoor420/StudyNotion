const mongoose=require('mongoose')

// create OTP schema
const otpSchema=new mongoose.Schema({

    email:{
        type:String,
        required:true 
    },
    otp:{
        type:String,
        required:true 
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*5 // OTP expires in 5 minutes // the document will be automatically deleted after 5 minutes of its creation time 
    }
   
})

// export  the OTP model
const OTP=mongoose.model("OTP",otpSchema)

module.exports=OTP 
