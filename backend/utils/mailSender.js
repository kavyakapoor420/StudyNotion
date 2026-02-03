
const nodemailer=require('nodemailer')

const mailSender=async(email ,title,body)=>{

    try{
        // create transporter
        const transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER ,
                pass:process.env.MAIL_PASS 
            }
        })

        let info=await transporter.sendMail({
            from : "StudyNotion || created by your own KAvya Kapoor",
            to:`${email}`,
            subject:`${title}`,
            html:`<div>${body}</div>`
        })
        console.log("mail info",info)
        return info 
    }catch(err){
         console.log("error in mail sender util",err)
    }

}
module.exports=mailSender ;
