const Otp = require("../Models/Otp");
const otpGenerator=require('otp-generator');
const User = require("../Models/User");
const bcrypt=require('bcryptjs');
const Profile = require("../Models/Profile");
const jwt=require('jsonwebtoken')

require('dotenv').config() 
//sendOTP 
exports.sendOTP=async(req,res)=>{

    try{
        //fecth email from request body
        const {email}=req.body ;

        //check if user already exists 
        const checkUserPresent=await User.findOne({email})

        //if user already exists ,then return error response 
        if(checkUserPresent){
            return res.status(401).json({success:false,message:'user already registered'})
        }

        //generate otp
        const otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        console.log('otp generated',otp)


        // check unique otp or not from db 
        let result=await Otp.findOne({otp:otp})

        while(result){
            otp=otpGenerator(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false 
            })

            result=await Otp.findOne({otp:otp})
        }

        const otpPayload={email,otp}

        //create an entry for OTP 
        const otpBody=await Otp.create(otpPayload)

        console.log(otpBody)

        //return successfull response 
            res.status(200).json({success:true,message:"otp send successfully",otp})

   }catch(err){
       console.log(err)
       res.status(500).json({success:false,message:'something went wrong'})
   }

}

// signUp 
exports.signUp=async(req,res)=>{

    try{
          //data fetch from req ki body 

          const {firstName,lastName,email,accountType,password,confirmPass,otp}=req.body 

          if(!firstName || !email ){
            return res.status(403).json({success:false,message:'all fields are required'})
          }

          if(password!==confirmPass){
            return res.status(400).json({success:false,message:'password and confirm pass value does not match try again later '})
          }

          const existingUsercheck=await User.findOne({email})

          if(existingUsercheck){
            return res.status(400).json({success:false,message:'user is already registered'})
          }

          // find most recent OTP stored for the user 
          const recentOtp=await Otp.find({email}).sort({createdAt:-1}).limit(1)

          if(recentOtp.length===0){
            // otp not found 
            return res.status(400).json({success:false,message:'otp not found'})
          }
          else if(otp!==recentOtp.otp){

            //invalid otp 
            return res.status(400).json({success:false,message:'invalid otp'})
          }

          //hash pass
          const hashehdPass=await bcrypt.hash(password,10)
         
          const profileData=await  Profile.create({
            gender:null,dateOfBirth:null,about:null,contactNumber:null
          })
          const user=await User.create({
            firstName,lastName,email,accountType,password:hashehdPass,
            additionalDetails:profileData._id ,
            image:`https://api.dicebear.com/9.x/avataaars/svg?seed=${firstName} ${lastName}?radius=50`
          })

          return res.status(200).json({success:true,message:'user is registered successfully',user})
    }catch(err){
           console.log(err)
          return res.status(500).json({success:false,message:'user cannot be registeredt due to some reason so try again'})
    }
}

//login 
exports.login=async(req,res)=>{

    try{
         // get data from req ki body 
         const {email,password}=req.body ;

         if(!email || !password){
            return res.status(403).json({success:false,message:'all fields are required please try againa'})
         }

         const user=await User.findOne({email}).populate("additionalDetails")

         if(!user){
            return res.status(401).json({success:false,message:"user is not registered please signup first "})
         }

         const matchpass=await bcrypt.compare(password,user.password)

         if(matchpass){
            const payload={
                email:user.email,
                id:user._id,
                role:user.role 
            }

            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'8h'})

            user.token=token
            user.password=undefined

            //create cookie and send response 
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true 
            }

            res.cookie("token",token,options).status(200).json({success:true,token,user,message:'user logged in successfully'})
         }
         else{
            return  res.status(401).json({success:false,message:'password is incorrect'})
         }
    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:'logging in failed'})
    }
}

//change Password 
