const OTP = require("../Models/Otp");
const User = require("../Models/User");
const bcrypt=require('bcrypt')
const otpGenerator=require('otp-generator')
const jwt=require('jsonwebtoken')
require('dotenv').config()

// send OTP to user
const sendOtp=async(req,res)=>{

    try{
        // fetch email from req ki body ok lala
         const {email}=req.body ;
        // check if user already exists with the email
        const checkUserPresent=await User.findOne({email})

        if(checkUserPresent){
            return res.status(401).json({success:false,message:'user already registered'})
        }

        // generate random 6 digit otp
        let otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
        console.log("otp generates is",otp)

        //check unique otp or not 
        // bekar code u have to check again from DB whetere unique or not 
        const result=await OTP.findOne({otp:otp})


        while(result){
            otp=otpGenerator(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })
            result=await OTP.findOne({otp:otp})
        }

        // store otp in db
        const otpPayload={email,otp}
        // create an entry for OTP 
        const otpBody=await OTP.create(otpPayload)

        //return response successfull 
        res.status(200).json({success:true,message:'otp sent successfully'})
    }catch(err){

    }
}


// signup user controller 
const signUp=async(req,res)=>{

    try{
        //data fetch from req body
        const {firstName,lastName,email,password,confirmPassword,accountType,otp}=req.body ;

        //validate data 
        if(!firstName || !lastName || !email || !password || !accountType){
            return res.status(400).json({success:false,message:'all fields are required'})
        }

        // 2 pass ko match krlo 
        if(password!==confirmPassword){
            return res.status(400).json({success:false,message:'password and confirm pass value does not macth please try again'})
        }
        // check if user already exists with the email
        const exisitingUser=await User.findOne({email })

        if(exisitingUser){
            return res.status(400).json({success:false,message:'user is already registered'})
        }

        // find most recent OTP stored for the user-> recent most value of OTP -> so sort krdo descending order me createdAt ke basis pe and limit 1
        const recentOtp=await OTP.findOne({email}).sort({createdAt:-1}).limit(1)

        // validate recent OTP with the otp provided by user
        if(recentOtp.length==0){
            return res.status(400).json({success:false,message:"otp not found"})
        }
        else if(otp!==recentOtp.otp){
            // inavlid OTP 
            return res.status(400).json({success:false,message:'invalid OTP'})
        }

        // hash password 
        const hashedPassword=await bcrypt.hash(password,10)

       // create entry of user 
       const user=await User.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
       })

       return res.status(200).json({success:true,message:'user is registered successfully',user})

    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"user cannot be registered plz try again"})
    }
}

// login controller
const login=async(req,res)=>{

    try{
        // fetch data from req body
        const {email,password}=req.body ;
        // validation data 
        if(!email || !password){
            return res.status(403).json({success:false,message:"all fields are required please tru again"})
        }

        // user check exist or not 
        const user=await User.findOne({email}).populate('additionalDetails')
        if(!user){
            return res.status(401).json({success:false,message:'user is not registered plz signup first'})
        }
        // generate jwt after password matching 
        const matchPass=await bcrypt.compare(password,user.password)

        if(matchPass){
            const payload={
                email:user.email,
                id:user._id,
                role:user.accountType 
            }

            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'2h'})
            user.token=token ;
            user.password=undefined 

            // create cookie 
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }


            res.cookie('token',token,options).status(200).json({
                success:true ,token,user,message:"logged in successfully"
            })
        }
        //password is incorrect
        else{
            return res.status(401).json({success:false,message:'invalid credentials plz try again'})
        }

        // and send response
    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"login failure please try again"})
    }
}

// chnage password controller
const changePassword=async(req,res)=>{
    
    try{
        // fetch data from req body
        const {oldPassword,newPassword,confirmNewPassword}=req.body ;
        const userId=req.user.id ;

        // validate data 
        if(!oldPassword || !newPassword || !confirmNewPassword){
            return res.status(400).json({success:false,message:'all fields are required please try again'})
        }

        // new password and confirm new password match krlo 
        if(newPassword!==confirmNewPassword){
            return res.status(400).json({success:false,message:'new password and confirm new password does not match please try again'})
        }

        // fetch user from db 
        const user=await User.findById(userId)

        // old password match krlo 
        const isMatch=await bcrypt.compare(oldPassword,user.password)

        if(!isMatch){
            return res.status(400).json({success:false,message:'old password is incorrect please try again'})
        }

        // hash new password 
        const hashedNewPassword=await bcrypt.hash(newPassword,10)

        // update password in db 
        user.password=hashedNewPassword ;
        await user.save()

        return res.status(200).json({success:true,message:'password changed successfully'})

    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"password cannot be changed plz try again"})
    }
}

module.exports={sendOtp,signUp,login,changePassword}

//change password controller 
// get data from req body 
// get oldPassword,newPassword,confirmNewPassword
// validate data 
// update password in db
// send mail-> password updated 
// return response successfullly