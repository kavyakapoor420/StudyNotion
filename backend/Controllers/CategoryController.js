const Tags = require("../Models/Tags");


exports.categoryPageDetails=async(req ,res)=>{

    try{
          const {categoryId}=req.body 

          const selectedCategory=await Category.findById(categoryId).populate('courses').exec() 

          if(!selectedCategory){
            return res.status(404).json({success:false,message:'data not found'})
          }

          const differentCategory=await Category.find({
            _id:{$ne:categoryId}
          })

          // get top selling course recommend it to user 

          return res.status(200).json({success:true,data:{selectedCategory,differentCategory}})


    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}