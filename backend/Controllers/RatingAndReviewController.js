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
exports.getAvgRating=async(req,res)=>{

    try{
        const courseId=req.body.courseId 

        const result=await RatingAndReview.aggregate([
            {
                $match:{course:new mongoose.Types.ObjectId(courseId)}
            },{
                $group:{
                    _id:null,averageRating:{$avg:"rating"}
                }
            }
        ])

        if(result.length>0){
            return res.status(200).json({success:true,averageRating:result[0].averageRating})
        }

        // if no rating / review exist 
        return res.status(200).json({
            success:true,message:'average rating is 0 , no rating given till now ',
            averageRating:0
        })

    }catch(err){    
        return res.status(500).json({success:false,message:err.message})
    }
}

// get all rating 
exports.getAllRatings=async(req ,res)=>{


    try{
            const allReviews=(await RatingAndReview.find({}))
                                                        .sort({rating:'desc'})
                                                        .populate({
                                                            path:"user",
                                                            select:'firstName lastName email image'
                                                        })
                                                        .populate({
                                                            path:'course',
                                                            select:"courseName"
                                                        })
                                                        .exec() 
    
         return res.status(200).json({success:true,message:'all reviews and rating fetched ',data:allReviews})
    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}