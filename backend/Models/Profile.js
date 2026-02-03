const mongoose=require('mongoose')

// create profile of user  schema
const profileSchema=new mongoose.Schema({

    gender:String,

    dateOfBirth:String ,

    about:{
        type:String,
        trim:true 
    },
    contactNumber:{
        type:Number,
        trim:true 
    }
   
})

// export  the profile  model
const Profile=mongoose.model("Profile",profileSchema)

module.exports=Profile
