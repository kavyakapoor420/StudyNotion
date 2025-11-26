const jwt=require('jsonwebtoken')
require('dotenv').config() 


//auth check 
exports.auth=async(req,resizeBy,next)=>{

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

// isInstructor 


// isAdmin