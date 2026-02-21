const Category = require("../Models/Category");


const categoryPageDetails=async(req,res)=>{

    try{
            // get categoryId 
            // get course for specified categoryId 
            // validation krlo 
            // get courses for different categories 
            // get top selling courses 
            // return response 

            const {categoryId}=req.body ;

            const selectedCategory=await Category.findById(categoryId)
                                                 .populate("courses")
                                                 .exec() 
            
            if(!selectedCategory){
                return res.status(404).json({success:false,message:"data not found"})
            }

            const differentCategories=await Category.find({
                                _id:{$ne:categoryId},
            })
            .populate('courses')
            .exec() 


            return res.status(200).json({success:true,data:{selectedCategory,differentCategories}})

    }catch(err){
         console.log(err)
         return res.status(500).json({success:false,message:'cannot get the deatils of category'})
    }
}

module.exports=categoryPageDetails