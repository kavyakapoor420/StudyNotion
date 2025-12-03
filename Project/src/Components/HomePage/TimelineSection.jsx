import React from 'react'

import Logo1 from '../../assets/Logo/Logo-Small-Dark.png'
import TimeLineImage from '../../assets/Images/TimelineImage.png'

const Timeline=[
    {
        Logo:Logo1 ,
        heading:"Leadership",
        Description:"Fully commited to the success company"
    },
    {
        Logo:Logo1 ,
        heading:"Leadership",
        Description:"Fully commited to the success company"
    },
    {
        Logo:Logo1 ,
        heading:"Leadership",
        Description:"Fully commited to the success company"
    },
    {
        Logo:Logo1 ,
        heading:"Leadership",
        Description:"Fully commited to the success company"
    },
]

const TimelineSection = () => {
  return (
    <div>
         <div className='flex flex-row gap-15 items-center'>


            <div className='w-[45%] flex flex-col gap-5'>
                    {
                        Timeline.map((ele,indx)=>{
                            return(
                                <div className='flex flex-row gap-6' key={indx}>

                                      <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                            <img src={ele.Logo} alt='image of logo'/>
                                      </div>

                                      <div>
                                         <h2 className='font-semibold text-[20px]'>
                                            {ele.heading}
                                         </h2>
                                         <p className='text-base'>
                                            {ele.Description}
                                         </p>
                                      </div>
                                </div>
                            )
                        })
                    }
            </div>

            <div className='relative shadow-blue-200'>
                 <img src={TimeLineImage} alt='timeLineLogoImage' className='shadow-white object-cover h-fit'/>

                 <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10 left-[50%] translate-x-[-20%] translate-y-[-50%]'>
                    <div className='flex flex-row gap-5  items-center border-r border-caribbeangreen-300'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                    </div>
                    
                    <div className='flex gap-5 items-center px-7'>
                          <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>Types of Courses</p>
                    </div>

                 </div>
            </div>

         </div>
    </div>
  )
}

export default TimelineSection