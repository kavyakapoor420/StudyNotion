

const isStudentMiddleware=async (req,res,next)=>{

    try{

        
    }catch(err){

        return res.status(500).json({success:false,message:"user role cannot be verified plz try again"})
    }

}