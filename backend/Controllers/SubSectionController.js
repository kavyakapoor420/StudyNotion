const Section = require("../Models/Section")
const SubSection = require("../Models/SubSection")



exports.createSubSection=async(req,res)=>{

    try{
        const {sectionId,title,description,timeDuration}=req.body 

        //extarct file /vide 
        const video=req.files.videoFile 

        if(!sectionId || !title || !description || !timeDuration || !video){
            return res.status(400).json({success:false,message:'all fields are required'})
        }

        const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME)    

        const SubSectionDetails=await SubSection.create({
            title,timeDuration,description,videoUrl:uploadDetails.secure_url
        })

        const updatedSection=await Section.findByIdAndUpdate(
            {_id:sectionId},{new:true},{$push:{subSection:SubSectionDetails._id}}
        )

        return res.status(200).json({success:true,message:'sub section created successfully',updatedSection})
        //upload video to cloudinary -> secure URl
    }catch(err){
        return res.status(500).json({success:false,message:"unable to created subsection plz try again",error:err.message})
    }
}

exports.updateSubSection=async(req,res)=>{

    try{
        const {subSectionId,sectionId,title,description,timeDuration}=req.body 

        //extarct file /vide 
        const video=req.files.videoFile 

        if(!subSectionId || !sectionId || !title || !description || !timeDuration || !video){
            return res.status(400).json({success:false,message:'all fields are required'})
        }

        const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME)    

        const subSection=await SubSection.findByIdAndUpdate(
            subSectionId,
            {
                title,
                description,
                timeDuration,
                videoUrl:uploadDetails.secure_url
            },
            {new:true}
        )

        return res.status(200).json({success:true,message:'sub section updated successfully',subSection})
        //upload video to cloudinary -> secure URl
    }catch(err){
        return res.status(500).json({success:false,message:"unable to update subsection plz try again",error:err.message})
    }
}

exports.deleteSubSection=async(req,res)=>{

    try{
          const {subSectionId}=req.params ;

          await SubSection.findByIdAndDelete(subSectionId)

          return res.status(200).json({success:true,message:'sub section deleted successfully'})
    }catch(err){
        return res.status(500).json({success:false,message:"unable to delete subsection plz try again",error:err.message})
    }
}