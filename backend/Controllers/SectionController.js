const Course = require("../Models/Course");
const Section = require("../Models/Section");



const createSection=async(req,res)=>{

    try{
        // date fecth validate it (data) -> then create section
        // update course with section ObjectId 
        // return response simple 

        const {sectionName,courseId}=req.body ;
        if(!sectionName || !courseId){
            return res.status(400).json({success:false,message:'missing properties'})
        }

        const newSection=await Section.create({sectionName})

        const updatedCourseDetails=await Course.findByIdAndUpdate(
            courseId,
            {
                  $push:{
                    courseContent:newSection._id 
                  }
                
            },
            {new:true} 
        )

        // todo : use populate to replace section and subsection both in updated Course Detaisl 

        return res.status(200).json({success:false,message:'section created successfully',updatedCourseDetails})

    }catch(err){    
        return res.status(500).json({success:false,message:"unable to create section please try again later",err})

    }
}

const updateSection=async(req,res)=>{
    try{
          // date fetch validate it 
          // update data of Section then return response simple
          const {sectionName,sectionId}=req.body ;
          
          if(!sectionName || !sectionId){
                return res.status(400).json({success:false,message:'missing properties'})
          }

          const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true})

          return res.status(200).json({success:true,message:'updated section successfully'})

    }catch(err){
          return res.status(500).json({success:false,message:"unable to update section please try again later",err})
    }
}

const deleteSection=async(req,res)=>{

    try{
         // get that particular Id of section which we have to delete from params -> req.params  
         // use findByIdAndDelete 

         const {sectionId}=req.params ;

         await Section.findByIdAndDelete(sectionId)
            // todo :do we need to delete entry from Course also ? 
            
         return res.status(200).json({status:true,message:'deleted section successfully'})

    }catch(err){
         return res.status(500).json({success:false,message:"unable to delete section please try again later",err})
    }
}

module.exports={createSection,updateSection,deleteSection}