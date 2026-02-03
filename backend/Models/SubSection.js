const mongoose=require("mongoose")

const subSectionSchema=new mongoose.Schema({
    title:String ,
    timeDuration:String,
    description:String ,
    videoUrl:String 
})


module.exports=mongoose.model("SubSection",subSectionSchema)
