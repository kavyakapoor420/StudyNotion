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
          
    }catch(err){

    }
}

module.exports={updateProfile}