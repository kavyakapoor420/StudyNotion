
const jwt=require("jsonwebtoken")
require('dotenv').config() 


// auth -> middleware to check if user requested is authentciated user or not -> jwt token verify 
const auth=async(req,res,next)=>{

    try{
         //extarct token
         const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","")

         // if token is missing return false response 
         if(!token){
            return res.status(401).json({success:false,message:'token is missing'})
         }

         // verify the token 
         try{
             const decode=await jwt.verify(token,process.env.JWT_SECRET)

         }catch(err){
            return res.status(401).json({success:false,message:'token is invalid'})
         }
         next() 
    }catch(err){
        return res.status(401).json({success:false,message:"something went worng while validating the token"})
    }
}

const isStudentMiddleware=async(req,res,next)=>{

    try{    
         if(req.user.accountType!=='Student'){
            return res.status(401).json({success:false,message:'this is protected route for students only'})
         }
         next() ;
         
    }catch(err){    
        return res.status(500).json({success:false,message:'user role cannot be verified'})
    }
}

const isInstructorMiddleware=async(req,res,next)=>{

    try{
         if(req.user.accountType!=='Instructor'){
            return res.status(401).json({success:false,message:"this is protected route for instructor only "})
         }
         next() 
    }catch(err){
        return res.status(500).json({success:false,message:"user role cannot be veirfied plz try again later "})
    }
}
const isAdminMiddleware=async(req,res,next)=>{

    try{
         if(req.user.accountType!=='Admin'){
            return res.status(401).json({success:false,message:"this is protected route for admin only "})
         }
         next() 
    }catch(err){
        return res.status(500).json({success:false,message:"user role cannot be veirfied plz try again later "})
    }
}

module.exports={isStudentMiddleware,auth,isAdminMiddleware,isInstructorMiddleware}