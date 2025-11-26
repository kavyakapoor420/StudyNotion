const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({

    firstName:{
        type:String,required:true,trim:true 
    },
    lastName:String,
    
    email:{
        type:String,unqiue:true,required:true 
    },
    password:{
        type:String,required:true 
    },
    confirmPass:{
        type:String
    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true 
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true ,
        ref:"Profile"
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
    ],
    image:{
        type:String,
        required:true 
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress"
        }
    ]
})


module.exports=mongoose.model("User",userSchema)

