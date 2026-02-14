const Section = require("../Models/Section");
const SubSection = require("../Models/SubSection");
const { uploadImageCloudinary } = require("../utils/imageUploader");



const createSubSection=async(req ,res)=>{

    try{

         // fetch data of Subsection from Req ki Body 
         // extarct file/ video -> req ki file 
         // upload video to cloundinary to get secure URL 
         // create sub section with info 
         // update sectipn with this SubSection ki ObjectId 
         // return response 

         const {sectionId,title,timeDuration,description}=req.body ;

         const video=req.files.videoFile 

         if(!sectionId || !title || !timeDuration || !description || !video){

            return res.status(400).json({success:false,message:'all fields are required'})
         }

         const uploadDetails=await uploadImageCloudinary(video,process.env.FOLDER_NAME)
        
         const SubSectionDetails=await SubSection.create({
            title,timeDuration,description,
            videoUrl:uploadDetails.secure_url 
         }) 

         const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},
                                                            {$push:{subSection:SubSectionDetails._id}},
                                                            {new:true})

         // todo : log updated section here , after adding populate here 

         return  res.status(200).json({success:true,message:"sub section created successfullly"})
    }catch(err){

        return res.status(500).json({success:false,message:'error in creating sub section '})
    }
}

// todo -> update subsection

// todo-> delete subSection 


module.exports={createSubSection}
