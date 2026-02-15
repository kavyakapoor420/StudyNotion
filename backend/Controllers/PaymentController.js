const {instance}=require('../config/razorpay');
const Course = require('../Models/Course');
const User = require('../Models/User');
const mailSender = require('../utils/mailSender')


// capture the payment and initiate the razorpay order 
// which course buying -> can be known from COurse ki id , and who is buying-> wil get to know from User ki id

const capturePayment=async(req,res)=>{

    try{

        // get courseId,UserId do validation (valid CourseId and courseDetail)
        // check if user has already paid for that same course 
        // create order 
        // return response 
        const {courseId}=req.body ;
        const userId=req.user.id ;

        if(!courseId){
            return res.json({success:false,message:'please provide valid course Id '})
        }

        let course ;
        try{
            course =await Course.findById(courseId) ;
            if(!course){
                return res.json({success:false,message:'could not find the course'})
            }

            const uid=new mongoose.Types.ObjectId(userId) // user ki ID string type converted to ObjectId 
            // user already paid for the COURSE 
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).josn({success:false,message:"student is alreayd enrolled"})

            }

        }catch(err){
            console.log(err)
            return res.status(500).json({status:false,message:err.message})
        }

        // order create
        const amount=course.price 
        const currency="INR" 

        const options={
            amount:amount*100 ,
            currency,
            receipt:Math.random(Date.now()).toString() ,
            notes:{
                courseId:courseId ,
                userId 
            }
        }

        try{
            // initiate the payment using razorpay 
            const paymentResponse=await instance.orders.create(options)
            console.log(paymentResponse)

            return res.status(200).json({
                        status:true,
                        courseName:course.courseName
                        ,courseDescription:course.courseDescription,
                        thumbnail:course.thumbnail,
                        orderId:paymentResponse.id ,
                        currency:paymentResponse.currency,
                        amount:paymentResponse.amount 
                    })
        }catch(err){

        }


    }catch(err){
         console.log(err)
         return res.json({succes:false,message:'could not initiate the order'})
    }
}

const verifySignature=async(req,res)=>{

    try{
         const webHookSecret='133444'
         const signature=req.headers('x-razorpay-signature')
          
         // hmac is algo+secret ket -> so more scure way of hashing function na 
         const shasum=crypto.createHmax("sha256",webHookSecret) ;
         shasum.update(JSON.stringify(req.body)) 
         const digest=shasum.digest('hex')


         if(signature===digest){
            console.log("payment is Authorized")

            const {courseId,userId}=req.body.payload.payment.entity.notes 


            try{
                // fullfill action after successfull payment from user-> enroll in course 
                // find course and enroll student in it

                const enrolledCourse=await Course.findOneAndUpdate(
                    {_id:courseId},
                    {$push:{studentsEnrolled:userId}},
                    {new:true}
                )

                if(!enrolledCourse){
                    return res.status(500).json({success:false,message:'course not found'})
                }
                console.log(enrolledCourse)

                const enrolledStudent=await User.findOneAndUpdate(
                    {_id:userId},
                    {$push:{course:courseId}},
                    {new:true}
                )

                console.log(enrolledStudent)

                //send mail  confirmation wala -> student successfully enrolled in course 
                const emailResponse=await mailSender(
                                                       enrolledStudent.email,
                                                       "cingratulations from Kavya Kapoor",
                                                       "Conguratulation your onboarded into new Kavya Kapoor companay course"
                )
                console.log(emailResponse)
                return res.status(200).json({success:true,message:'signature verified and course addedd'})

            }catch(err){

                console.log(err) 
                return res.status(500).json({success:false,message:err.message})
            }

         }
         else{
            return res.status(400).json({status:false,message:'invalid request'})
         }

         // order ke options ke notes se -> get userId and courseId 
 
    }catch(err){

    }

}


module.exports={capturePayment}