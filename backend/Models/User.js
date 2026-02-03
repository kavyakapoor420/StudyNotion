
const mongoose=require("mongoose")
const CourseProgress = require("./CourseProgress")

const userSchema=new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true 
    },
    // define the email feild with type string required and trimmed 
    email:{
        type:String,
        required:true,
        trim:true 
    },

    password:{
        type:String,
        required:true 
    },
    accountType:{
        type:String,
        enum:['Admin','Student','Instructor'] ,
        required:true 
    },
    active:{
        type:Boolean,
        default:true 
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId ,
        required:true ,
        ref:"Profile"
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId ,
            ref:"Course"
        }
    ],
    
    token:String,

    resetPasswordExpires:Date,

    image:{
        type:String,
        required:true
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'courseProgress'
        }
    ]
 // add timestamps for when document is created and last modifed 

},{timestamps:true})

module.exports=mongoose.model("User",userSchema)

