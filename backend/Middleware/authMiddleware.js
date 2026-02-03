const jwt=require('jsonwebtoken')
require('dotenv').config() 


// auth middleware -> to check whether the request is from authenticated user or not

const auth=async(req,res,next)=>{

    try{
        // fetch token from headers
        const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer","")

        // if token is missing then return response 
        if(!token){
            return res.status(401).json({success:false,message:'token missing'})
        }

        // verify token 
        try{
             const decode=await jwt.verify(token,process.env.JWT_SECRET_KEY)
             console.log("decoded token",decode)
             req.user=decode 

        }catch(err){
            // verification issue 

             return res.status(401).json({success:false,message:'token is invalid'})
        }

        next() // proceed to next function
    }catch(err){    

        return res.status(500).json({success:false,message:"something went wrong while validating the token"})
    }

}
