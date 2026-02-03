const mongoose=require('mongoose')

// create category schema
const categorySchema=new mongoose.Schema({

    name:{
        type:String,required:true 
    },
    description:String ,
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ]
})

// export  the tags model
module.exports=mongoose.model("Category",categorySchema)
