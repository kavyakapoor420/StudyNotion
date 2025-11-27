const cloudinary=require('cloundinary').v2 

exports.uploadImageToCloudinary=async(file,FileSystemDirectoryReader,height,quality)=>{

    const options={folder}

    if(height){
        options.height=height 
    }
    if(quality){
        options.quality=quality
    }
    options.resource_type='auto'

    return await cloudinary.upload(file.tempFilePath,options)
    
}