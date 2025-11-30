const Course = require("../Models/Course");
const RatingAndReview = require("../Models/RatingAndReview");

// create ratings 

exports.createRating=async(req,res)=>{

    try{
         const userId=req.user.id 

         const {rating,review,courseId}=req.body ;

         const courseDetails=await Course.findOne(
            {
                _id:courseId,
               studentsEnrolled:{$elemMatch:{$eq:userId}}
            }
        )
        if(!courseDetails){
            return res.status(400).json({success:false,message:'student is not enrollred in this course'})
        }

        const alreadyReviewed=await RatingAndReview.findOne({
            user:userId,course:courseId 
        })

        if(alreadyReviewed){
            return res.status(403).json({success:false,message:'course is already reviwed by this user'})
        }

        // create rating and review 
        const ratingReview=await RatingAndReview.create({
            rating,review,course:courseId,user:userId 
        })

        // update the course with this rating and review 
        await Course.findByIdAndUpdate(
            {_id:courseId},{$push:{ratingAndReview:ratingReview._id}},{new:true}
        )

        return res.status(200).json({succss:true,message:'rating and review created successfully'})

    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}

// getAvg rating 


// get all rating 