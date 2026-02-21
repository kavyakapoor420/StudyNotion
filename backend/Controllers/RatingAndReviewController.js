

// create Rating 

const Course = require("../Models/Course")
const RatingAndReview = require("../Models/RatingAndReview")

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
                studentsEnrolled:{$elemMatch:{$req:userId}}
            },
        )

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:'student is not enrolled in the course'
            })
        }

        const alreadyReviewed=await RatingAndReview.findOne({
            user:userId,
            course:courseId
        })

        if(alreadyReviewed){
            return res.status(403).json({success:false,message:'course is already reviewd by the user'})
        }


    }catch(err){

    }

}
// average rating 

// get All Rating 

module.exports={createRating}