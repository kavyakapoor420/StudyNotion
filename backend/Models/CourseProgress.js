const mongoose=require('mongoose')

// create category schema
const courseProgressSchema=new mongoose.Schema({

    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },

    completedVideos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection"
        }
    ]
})

// export  the tags model
module.exports=mongoose.model("courseProgress",courseProgressSchema)
