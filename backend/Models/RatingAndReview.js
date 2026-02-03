const mongoose=require('mongoose')

// create profile of user  schema
const ratingAndReviewSchema=new mongoose.Schema({

   user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true ,
    ref:"User"
   },
   rating:{
    type:Number,
    required:true 
   },
   review:{
    type:String,
    required:true 
   },
   course:{
    type:mongoose.Schema.Types.ObjectId,
    required:true ,
    ref:"Course",
    index:true 
   }
   
})

// export  the rating and review  model
module.exports=mongoose.model("RatingAndReview",ratingAndReviewSchema)

