const mongoose=require("mongoose")

const sectionSchema=new mongoose.Schema({

    sectionName:String ,

    subSection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SubSection"
        }
    ]
})

// export the section model
module.exports=mongoose.model("Section",sectionSchema)
