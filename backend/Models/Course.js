const mongoose=require('mongoose')

const courseSchema=new mongoose.Schema({

    courseSchema:String ,
    
    courseDescription:String ,

    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true 
    },

    whatYouWillLearn:String ,

    courseContent:[
        {
            type:mongoose.Schema.Types.Objectid ,
            ref:"Section"
        }
    ],
    ratingAndReview:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    price:Number ,

    thumbnail:String ,

    tag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    },  
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true ,
            ref:"User"
        }
     ]

})

module.exports=mongoose.model("Course",courseSchema)
