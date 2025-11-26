const mongoose=require('mongoose')

const subsectionSchema=new mongoose.Schema({

    title:{
        type:String 
    },
    timeDuration:String ,

    description:{
        type:String
    },
    videoUrl:String 
    
})


module.exports=mongoose.model("SubSection",subsectionSchema)
