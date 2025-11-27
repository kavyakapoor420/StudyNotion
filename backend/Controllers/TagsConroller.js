const Tags = require("../Models/Tags");

//create tag hanlder functionn
exports.createTag=async(req,res)=>{

    try{
         const {name,description}=req.body ;

         if(!name || !description){
            return res.status(400).json({success:false,message:"all feilds are required"})
         }

         const tagDetails=await Tags.create({
            name,description 
         })

         return res.status(201).json({success:true,message:'tag created successfully'})
    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}

// get all tags handler function
exports.showAllTags=async(req,res)=>{

    try{
        const allTags=await Tags.find({},{name:true,description:true}).populate("course")

        return res.status(200).json({success:true,allTags,message:'all tags fetched successfully'})

    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}