const { default: mongoose } = require('mongoose')
const {instance}=require('../config/razorpay')
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollnmentEmail')
const Course = require('../Models/Course')
const User = require('../Models/User')
const mailSender = require('../utils/mailSender')

// without using webhook u can read razorpay docs 
// func for order initiate write another fnc to verify Payment
exports.capturePayment2=async(req,res)=>{
     
     const {courses}=req.body 
     const userId=req.user.id 

     if(courses.length===0){
         return res.json({success:false,message:'please provide course ID '})
     }

     let totalAmout=0;

     for(const course_id of courses){
        let course;

        try{
             course=await Course.findById(course_id)
             if(!course){
                return res.status(200).json({success:false,message:'could not find the course'})
             }

             const uid=new mongoose.Types.ObjectId(userId)

             if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({success:false,message:'student is already enrolled'})
             }

             totalAmout+=course.price

        }catch(err){
            console.log(err)
            return res.status(500).json({success:false,message:err.message})
        }
     }

     const options={
        amout:totalAmout*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString() 
     }

     try{
          const paymentResponse=await instance.create(options)
          res.json({
            success:true,data:paymentResponse
          })
     }catch(err){
          console.log(err)
          return res.status(500).json({success:false,message:'could not intitate order of payment '})
     }
}

exports.verifySignature2=async(req,res)=>{

     const userId=req.user.id 
     const razorpay_order_id=req.body?.razorpay_order_id
     const courses=req.body?.courses
     const razorpay_signature=req.body?.signature
     const razorpay_payment_id=req.body?.razorpay_payment_id
     
     if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
         return res.status(200).json({success:false,message:'payment failed'})
     }


     let body=razorpay_order_id + "|" + razorpay_payment_id
     const expectedSignature=crypto
                            .createHmac("sha256",process.env.RAZORPAY_WEBHOOK_SECRET)
                            .update(body.toString())
                            .digest("hex")

    if(expectedSignature===razorpay_signature){
        // enroll  kro stundent to course 

        await enrollStudents()
        return res.status(200).json({success:true,message:'payment verified'})
    }

    return res.status(200).json({success:false,message:'payment failed'})

}

const enrollStudents=async(courses,userId,res)=>{
      
    if(!courses || !userId){
        return res.status(400).json({success:false,message:'please provide data for courses or userid'})
    }

    for (const course_id of courses){
        // find the course and enroll the student in it
        const enrolledCourse=await Course.findOneAndUpdate(
            {_id:course_id},
            {$push:{studentsEnrolled:userId}},
            {new:true}
        )

        if(!enrolledCourse){
            return res.status(500).json({success:false,message:'course not found'})
        }

        // find the student and add the course to their list of enrolledCourses 
        const enrolledStudent=await User.findByIdAndUpdate(userId,{$push:{courseId:course_id}},{new:true})

        const emailResponse=await mailSender(
            enrollStudents.email,
            ``
        )
    }
}

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