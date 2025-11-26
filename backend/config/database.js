const mongoose=require('mongoose')
require('dotenv').config() 

exports.connectDB=()=>{
    mongoose.connect(process.env.MONGO_URL)
            .then(()=>console.log('connected to db'))
            .catch((err)=>{
                console.log('db connected failed')
                console.error(err)
                process.exit(1)
            })
}

