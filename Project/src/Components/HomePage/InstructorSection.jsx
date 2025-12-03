import React from 'react'

import InstructorImage from '../../assets/Images/Instructor.png'
import HighlighTextHome from '../../Pages/HighlighTextHome'
import CTAButton from '../CTAButton'
import { FaArrowRight } from 'react-icons/fa'


const InstructorSection = () => {
  return (
    <div>
          <div className='flex flex-row gap-20 items-center'>

                <div className='w-[50%]'>
                    <img src={InstructorImage} alt='Instructor image' className='shadow-white'/>
                </div>

                <div className='flex flex-col w-[50%] gap-10'>
                    <div className='text-4xl w-[50%] font-semibold'>
                        Become an <HighlighTextHome text={"Instructor"}/>
                    </div>

                    <p className='font-medium text-[16px] w-[80%] text-richblack-500'>
                            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>
                    <div className='w-fit'>
                         <CTAButton active={true} linkTo={'/signup'}>
                            <div className=' flex flex-row gap-2 items-center'> 
                                Start teaching Today
                                <FaArrowRight/>
                            </div>
                          </CTAButton>
                    </div>
                   
                </div>
          </div>
    </div>
  )
}

export default InstructorSection