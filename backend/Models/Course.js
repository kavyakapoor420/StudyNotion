const mongoose=require('mongoose')

// create category schema
const courseSchema=new mongoose.Schema({

     courseName:String,
     courseDescription:String,
     instructor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true ,
        ref:"User"
     },
     whatYouWillLearn:String ,
     courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId ,
            ref:"Section"
        }
     ],
     ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
     ],
     price:{
        type:Number,
     },
     thumbnail:String ,
     tag:{
        type:[String],
        required:true 
     },

     category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
     },
     studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true ,
            ref:"User"
        }
     ],
     instructions:{
        type:[String]
     },
     status:{
        type:String,
        enum:['Draft','Published','Blocked'],
     },
     createdAt:{
        type:Date,
        default:Date.now 
     }
})

// export  the tags model
module.exports=mongoose.model("Course",courseSchema)
