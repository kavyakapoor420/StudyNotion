import React from 'react'
import HighlighTextHome from '../../Pages/HighlighTextHome'

import Know_Your_Progress from '../../assets/Images/Know_your_progress.svg'
import Plan_Your_Lesson_Image from '../../assets/Images/Plan_your_lessons.png'
import CompareWithOtherImage from '../../assets/Images/CompareWithOtherImage.svg'
import CTAButton from '../CTAButton'

const LearningLanguageSection = () => {
  return (
    <div className='mt-16'> 
          
            <div className='flex flex-col gap-5 items-center'>
                <div className='text-4xl font-semibold text-center'>
                    Your Swiss Knife for 
                    <HighlighTextHome text={"learning any language"}/>
                </div>

                <div className='text-center text-richblack-600 mx-auto text-base font-medium'>
                   Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>

                <div className='flex flex-row items-center justify-center mt-5'>
                        <img src={Know_Your_Progress} 
                             alt='know your progress image'
                             className='object-contain -mr-32'
                        />
                         <img src={CompareWithOtherImage} 
                             alt='know your progress image'
                             className='object-contain'
                        />
                         <img src={Plan_Your_Lesson_Image} 
                             alt='know your progress image'
                             className='object-contain -ml-36'
                        />
                </div>

                <div className='w-fit '>
                    <CTAButton active={true} linkTo={'/signup'}>
                        <div>Learn more</div>
                    </CTAButton>
                </div>

            </div>
    </div>
  )
}

export default LearningLanguageSection