const Profile = require("../Models/Profile")
const User = require("../Models/User")

//profile -> addtional Details of user 
// during singup we have created profile with NULL values of profile of user So just update it 
exports.updateProfile=async(req,res)=>{
    
    try{
         const {dateOfBirth="",about="",contactNumber,gender}=req.body 

         const id=req.user.id 

         if(!contactNumber || !gender){
            return res.status(400).json({success:false,message:'all fields are required'})
         }
         const userDetails=await User.findById(id)
         const profileId=userDetails.additionalDetails

         const profileDetails=await Profile.findById(profileId)

         profileDetails.dateOfBirth=dateOfBirth 
         profileDetails.about=about
         profileDetails.contactNumber=contactNumber
         profileDetails.gender=gender

         await profileDetails.save() 

         return res.status(200).json({success:true,message:'profile updated successfully',profileDetails})

    }catch(err){
         return res.status(500).json({success:false,error:err.message});
       
    }
}
    
// how can we schedule account deletion like after 3 days 
exports.deleteAccount=async(req,res)=>{

    try{
         const id=req.user.id 

         const userDetails=await User.findById(id)

         if(!userDetails){
            return res.status(404).json({success:false,message:'user not found'})
         }

         await Profile.findByIdAndDelete({_id:userDetails.additionalDetails})

         await User.findByIdAndDelete({_id:id})

         return res.status(200).json({success:true,message:'user deleted successfully'})

    }catch(err){
        return res.status(500).json({success:false,message:"user cannot be deleted plz try again",error:err.message});
    }
}

exports.getAllUserDetails=async(req,res)=>{

    try{
         const id=req.user.id 

         const userDetails=await User.findById(id).populate('additionalDetails')

         return res.status(200).json({success:true,message:'user details fetched successfully',data:userDetails })
    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}