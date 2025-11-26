const jwt=require('jsonwebtoken')
require('dotenv').config() 


//auth check 
exports.auth=async(req,res,next)=>{

    try{
        //extract token 
        const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","")

        if(!token){
            return res.status(401).json({success:false,message:'token is missing'})
        }

        // verify token 
        try{
            const decode=await jwt.verify(token,process.env.JWT_SECRET) 
            req.user=decode 
        }catch(err){
            return res.status(401).json({success:false,message:'invalid token'})
        }

        next() 
    }catch(err){
        return res.status(401).json({success:false,message:'something wnet wrong while validating token'})
    }
}

// is Student check role 
exports.isStudent=async(req,res,next)=>{
    try{
        if(req.user.accountType!=='Student'){
            return res.status(401).json({success:false,message:'this is protected route for students only'})
        }
        next()
    }catch(err){
        return res.status(500).json({success:false,message:'user role cannot be verified'})
    }
}
// isInstructor 
exports.isInstuctor=async(req,res,next)=>{
    try{
        if(req.user.accountType!=='Instructor'){
            return res.status(401).json({success:false,message:'this is protected route for instructor only'})
        }
        next() 
    }catch(err){
        return res.status(500).json({success:false,message:'user role cannot be verified '})
    }
}

// isAdmin
exports.isAdmin=async(req,res,next)=>{
    try{
        if(req.user.accountType!=='Admin'){
            return res.status(401).json({success:false,message:'this is protected route for Admin only'})
        }
        next() 
    }catch(err){
        return res.status(500).json({success:false,message:'user role cannot be verified '})
    }
}