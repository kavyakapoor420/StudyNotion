const Category = require("../Models/Category");
const Course = require("../Models/Course");
const User = require("../Models/User");
const { uploadImageCloudinary } = require("../utils/imageUploader");


// create new course handler function
const createCourse=async(req,res)=>{

    try{
          // data fetch and file fetch from req.file 
          const {courseName,courseDescription,whatYouWillLearn,price,category}=req.body ;
          // and thumbnail file fetch from req.file
          const thumbnail=req.file.thumbnailImage ;
          
          if(!courseDescription || !courseName  || !price || !tag || !thumbnail ){
            return res.status(400).json({success:false,message:'all feilds are required'})
          }
          // check for instructor 
          const userId=req.user.id 
          const instructorDetails=await User.findById(userId)
          console.log("instrcutor details",instructorDetails)

          if(!instructorDetails){
            return res.status(404).json({success:false,message:"instructor details not found"})
          }

          // check given category is valid or not 
          const categoryDetails=await Category.findById(category)

          if(!categoryDetails){
            return res.status(404).json({success:false,message:'category details not found'})
          }

          // upload Image to cloudinary 
          const thumbnailImage=await uploadImageCloudinary(thumbnail,process.env.FOLDER_NAME)

          // create an entry for new course
          const newCourse=await Course.create({
            courseName,courseDescription,
            instructor:instructorDetails ,
            price:price ,
            category:categoryDetails._id ,
            thumbnail:thumbnailImage.secure_url 
          })

          // add the new course user schema of instructor -> becoz instructor create the course so he will not buy it , so just add in her list direct 
          await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {$push:{courses:newCourse._id}},
            {new:true}

          )

          // todo: udpate category schema 

          // return response 
          return res.status(200).json({
            success:false,
            message:"course details updated successfully",
            data:newCourse
        });

    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"failed to create new course",error:err.message})

    }
}

// get all course handler function
const showAllCourse=async(req,res)=>{

    try{
         const allCourse=await Course.find({},
            {courseName:true},
            {price:true},
            {thumbnail:true},
            {instructor:true},
            {ratingAndReview:true},
            {studentsEnrolled:true}  
        ).populate("instructor").exec() ;

        return res.status(200).json({success:true,message:'data for all course fecthed successfully',data:allCourse})
        
    }catch(err){
        return res.status(500).json({success:false,message:'cannot fecth course data',error:err.message})
    }
}

module.exports={createCourse}