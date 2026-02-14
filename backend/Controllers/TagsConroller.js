

/// create new TAg handler function 

const Category = require("../Models/Category");



const createTag=async(req,res)=>{

    try{

        // fecth data of caetgory from req ki body then validation
        // create entry for it in DB and finally return response 
         const {name,description}=req.body ;

         if(!name || !description){
            return res.status(400).json({success:false,message:'all fields are required'})
         }
         // create entry in DB 
         const categoryDetails=await Category.create({
            name:name,description:description
         })
         console.log(categoryDetails) 

         return res.status(200).json({success:true,message:'category  created successfully'})


    }catch(err){
        return res.status(200).json({success:false,message:err.message})
    }
}

// get All Tags /category  handler function
const showAllCategories=async(req,res)=>{
     try{
         const allCategories=await Category.find({},{name:true,description:true}) 

         return res.status(200).json({success:true,message:'all category fecthed successfully'})

     }catch(err){
         return res.status(500).json({success:false,message:"something went wrong while fecthing all categories"})
     }

}


module.exports={createTag,showAllCategories}