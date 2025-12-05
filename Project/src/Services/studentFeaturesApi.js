import {toast} from 'react-hot-toast'
import {apiConnector} from '../Services/apiConnector'



function LoadScript(src){

    return newPromise((resolve)=>{
        const script=document.createElement("script")
        script.src=src 

        script.onload=()=>{
            resolve(true)
        }
        script.onerror=()=>{
            resolve(false)
        }
        document.body.appendChild(script)
    })
}


export async function buyCourse(){
      
    const toastId=toast.loading("Loading....")

    try{
         // load the script 
         const res=await LoadScript("https://checkout.razorpay.com/v1/checkout.js")

         if(!res){
            toast.error("razorpay SDK failed to load")
            return 
         }

         //initiate the Order 


    }catch(err){

    }

}