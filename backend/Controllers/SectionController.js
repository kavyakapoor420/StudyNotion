const Course = require("../Models/Course");
const Section = require("../Models/Section");

exports.createSection=async(req,res)=>{

    try{
         const {sectionName,courseId}=req.body ;

         if(!sectionName || !courseId){
            return res.status(400).json({success:false,message:'all fields are required'})
         }

         const newSection=await Section.create({
            sectionName,
            courseId
         })
          // update course with this new section 
         const udpatedCourseDetails=await Course.findByIdAndUpdate(
            courseId,{$push:{courseContent:newSection._id}},{new:true}
        )

        return res.status(200).json({success:true,message:'section created successfully',udpatedCourseDetails})
    }catch(err){
        return res.status(500).json({success:false,message:"unable to created section plz try again",error:err.message})
    }
}

exports.updateSection=async(req,res)=>{

    try{
         const {sectionName,sectionId}=req.body ;
         
         if(!sectionName || !sectionId){
            return res.status(400).json({success:false,message:'all fields are required'})
         }  
         const section=await Section.findByIdAndUpdate(
            sectionId,{sectionName},{new:true}
        )

        return res.status(200).json({success:true,message:'section updated successfully',section})
    }catch(err){
        return res.status(500).json({success:false,message:"unable to update section plz try again",error:err.message})
    }
}

exports.deleteSection=async(req,res)=>{

    try{
           // get id -> assuming that we are sending ID in params 
           const {sectionId}=req.params ;
           await Section.findByIdAndDelete(sectionId)

           return res.status(200).json({success:true,message:'section deleted successfully'})
    }catch(err){
        return res.status(500).json({success:false,message:"unable to delete section plz try again",error:err.message})
    }
}