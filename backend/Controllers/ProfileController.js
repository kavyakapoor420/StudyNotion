const Profile = require("../Models/Profile")
const User = require("../Models/User")

const updateProfile=async(req,res)=>{

    try{
         // get User data (userId also from  req.user.id ->decode user is authenticated)
         // find profile - udpate profile -
         // return response 

        const {dateOfBirth="",about="",contactNumber,gender}=req.body 
        const userId=req.user.id 

        if(!contactNumber || !gender || !id){
            return res.status(400).json({success:false,message:'all fields are required'})
        }

        const userDetails=await User.findById(id) 
        const profileId=userDetails.additionalDetails 

        const profileDetails=await Profile.findById(profileId)


        // update profile 
        profileDetails.dateOfBirth=dateOfBirth
        profileDetails.about=about 
        profileDetails.gender=gender
        profileDetails.contactNumber=contactNumber

        await profileDetails.save() 

        return res.status(200).json({success:true,message:'profile updated successfully',profileDetails})

    }catch(err){
        return res.status(500).json({success:false,message:"profile updatation failed due to some reason "})
    }   
}

const deletePofile=async(req,res)=>{

    try{
          // get id of user -> validate if it acctually exists 
          // delete profile then delete corressponding User 
          // return response 

          const id=req.user.id 
          const userDetails=await User.findById(id) ;

          if(!userDetails){
            return res.status(404).json({success:false,message:'user not found'})
          }

          await Profile.findByIdAndDelete({_id:userDetails.additionalDetails})
            // todo : unenrolle user from all courses then
          await User.findByIdAndDelete({_id:id})

          return res.status(200).json({success:true,message:'user deleted successfully'})
        
    }catch(err){
         return res.status(500).json({success:false,message:"user cannot be deleted"})
    }
}

const getProfile=async(req,res)=>{

    try{
        // get id user ,validate it and get user details 
        // return response 
         const id=req.user.id 
         const userDetails=await User.findById(id).populate("additionalDetails").exec() 

         return res.status(200).json({success:true,message:'user data fetched successfully'})

    }catch(err){
        return res.status(500).json({success:false,message:'failed to fecthed profile of user '})
    }
}



module.exports={updateProfile,deletePofile,getProfile}