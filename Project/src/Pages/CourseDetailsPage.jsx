
import React from 'react'

const CourseDetailsPage = () => {

    const handleBuyCourse=()=>{
        if(token){
           buyCourse() 
           return 
        }
    }

  return (
     <div className='flex items-center'>
         <button className='bg-yellow-50 p-6 mt-10'
                 onClick={()=>handleBuyCourse}
         >  
          Buy Now 
         </button>
     </div>
  )
}

export default CourseDetailsPage