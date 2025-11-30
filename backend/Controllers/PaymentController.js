const { default: mongoose } = require('mongoose')
const {instance}=require('../config/razorpay')
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollnmentEmail')
const Course = require('../Models/Course')
const User = require('../Models/User')
const mailSender = require('../utils/mailSender')


// capture payment and create order -> payment gateway -> razorpay

exports.capturePayment=async(req,res)=>{

    try{
        const {courseId}=req.body ;
        const userId=req.user.id 

        if(!courseId){
            return res.json({success:false,message:'please provide valid courseId'})
        }
        let courseDetails
        try{
            courseDetails=await Course.findById(courseId)
            if(!courseDetails){
                return res.json({success:false,message:'could not find the course'})
            }

            //check if user is already enrolled in that same course so paid already 

            //userId -> string converted to objectId
            const uid=new mongoose.Types.ObjectId(userId)

            if(courseDetails.studentsEnrolled.includes(uid)){
                return res.json({success:false,message:'student is already enrolled in this course'})
            }

            // order create -> amount=course price, currency INR 
            const amount=courseDetails.price*100 ; // in paise
            
            const currency="INR"

            const options={
                amount,currency,receipt:`receipt_order_${Math.random()*1000}`,notes:{courseId:courseId,userId}
            }

            try{
                // intiate the payment using razorpay instance
                const paymentResponse=await instance.orders.create(options)
                console.log(paymentResponse)

                return res.statys(200).json({
                    success:true,
                    courseName:courseDetails.courseName,
                    courseDescription:courseDetails.description,
                    thumbnail:courseDetails.thumbnail,
                    orderId:paymentResponse.id,
                    currency:paymentResponse.currency,
                    amount:paymentResponse.amount
                })
            }catch(err){

            }

        }catch(err){    
            return res.status(500).json({success:false,message:err.message})
        }
    }catch(err){

    }
}

// verify signature -> enroll the student in the course -> send mail to student
exports.verifySignature=async(req,res)=>{ 

    try{
         const webHookSecret=process.env.RAZORPAY_WEBHOOK_SECRET

         const signature=req.headers['x-razorpay-signature']
         
         const shasum=crypto.createHmac('sha256',webHookSecret)
         shasum.update(JSON.stringify(req.body))

         const digest=shasum.digest('hex')

         if(signature==digest){

            console.log('request is legit payment is authorized')

            const {courseId,userId}=req.body.payload.payment.entity.notes 

            try{
                // enroll the student in the course fullfill the action -> find the course and enroll stundent in it
                const enrolledCourse=await Course.findByIdAndUpdate(
                    {_id:courseId},{$push:{studentsEnrolled:userId}},{new:true}
                )

                if(!enrolledCourse){
                    return res.status(500).json({success:false,message:"course not found"})
                }
                // find the student and add the course to their list of enrolled courses
                const enrolledStudent=await User.findOneAndUpdate(
                    {_id:userId},{$push:{courses:courseId}},{new:true}
                )

                // send mail to student saying enrollment successfull confirmation
                const email=enrolledStudent.email 
                const name=enrolledStudent.name 
                const title='Congratulations! Enrolled successfully'

                const emailResponse=await mailSender(
                    enrolledStudent.email,
                    title,
                    courseEnrollmentEmail(name,enrolledCourse.courseName,email)
                )


                return res.status(200).json({success:true,message:'signature verified and course added'})
            }catch(err){
                return res.status(500).json({success:false,message:err.message})
            }
         }else{
            return res.status(400)
         }
    }catch(err){

    }
}