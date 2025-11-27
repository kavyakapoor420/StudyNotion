const Course = require('../Models/Course');
const Tags = require('../Models/Tags');
const User=require('../Models/User');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

//logic for create course handler function 
exports.createCourse=async(req,res)=>{
    try{
          const {courseName,courseDescription,whatYouWillLearn,price,tag}=req.body ;

          const thumbnail=req.files.thumbnailImage 

          if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
                return res.status(400).json({success:false,message:'all feilds are required'})
           } 
           const userId=req.user.id 

           const instructorDetails =await User.findById(userId)

           if(!instructorDetails){
            return res.status(404).json({success:false,message:'instructor details not found '})
           }

           const tagDetails=await Tags.findById(tag)

           if(!tagDetails){
            return res.status(404).json({success:false,message:'tag details not found '})
           }

           //upload thumbnail image to cloudinary 
           const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME)

           const newCourse=await Course.create({
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag:tagDetails._id,
            instructor:instructorDetails._id,
            thumbnail:thumbnailImage.secure_url 
           })

           // add this new course to instructor's created course array list 
           await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{courses:newCourse._id}
            },
            {new:true}
           )
           

           return res.status(201).json({success:true,message:'course created successfully',data:newCourse})

    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }

}

// get all courses handler function
exports.showAllCourses=async(req,res)=>{
    try{
         const allCourses=await Course.find({})

         return res.status(200).json({success:true,data:allCourses,message:'data for all courses fetched successfully'})

    }catch(err){
        return res.status(500).json({success:false,message:'cannot fetch courses data',error:err.message})
    }   
}