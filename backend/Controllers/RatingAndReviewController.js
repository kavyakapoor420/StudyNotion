

// create Rating 

const Course = require("../Models/Course")
const RatingAndReview = require("../Models/RatingAndReview")

// create rating handler function 
const createRating=async(req,res)=>{

    try{
        // get user id -> author who has given rating(start number) and review(text string)
        // fetch data from req ki body 
        // check if user is enrolled in course or not 
        // check if user has already provided review to course -> no duplicacy
        // update course with this rating and review 


        const userId=req.user.id 
        const {rating,review,courseId}=req.body 
        const courseDetails=await Course.findOne(
            {_id:courseId,
                studentsEnrolled:{$elemMatch:{$eq:userId}}
            }
        )

        if(!courseDetails){
            return res.status(404).json({success:false,message:"student is not enrolled in the course"})
        }
        const alreadyReviewed=await RatingAndReview.findOne({
            user:userId,
            course:courseId 
        })

        if(alreadyReviewed){
            return res.status(403).json({success:false,message:'course is already reviwed by user'})
        }
        
        const ratingReview=await RatingAndReview.create({
            rating:review,
            course:courseId,
            user:userId 
        })

        const updateCourseDetails=await Course.findByIdAndUpdate(
            {_id:courseId},
            {$push:{ratingAndReviews:ratingReview._id}},
            {new:true}
        )

        console.log(updateCourseDetails)

        return res.status(200).json({success:true,message:"rating and review created successfully",ratingReview})

    }catch(err){

        return res.status(500).json({success:false,message:err.message})
    }

}

// average rating 
const getAverageRating=async(req ,res)=>{

    try{
        // get courseId then calcualte avg rating
        // return response-> rating 

        const courseId=req.body.courseId  // its string later below we have converted into ObjectId -> new mongoos.Types.ObjectId 

        const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:'$rating'} 
                }
            }
        ])

        // retrun rating 
        if(result.length>0){
            return res.status(200).json({success:true,averageRating:result[0].averageRating})
        }

        return res.status(200).json({success:true,message:'average rating is 0 , no ratings given till now '})

    }catch(err){
        return res.status(500).json({success:true,message:err.message})
    }
}

// get All Rating 
const getAllRatings=async(req, res)=>{

    try{

    }catch(err){

    }
    
}
module.exports={createRating,getAverageRating}