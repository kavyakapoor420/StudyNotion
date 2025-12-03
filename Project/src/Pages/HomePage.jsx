import React from 'react'
import {Link} from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
import HighlighTextHome from './HighlighTextHome'
import CTAButton from  '../Components/CTAButton'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../Components/CodeBlocks'
import TimelineSection from '../Components/HomePage/TimelineSection'
import LearningLanguageSection from '../Components/HomePage/LearningLanguageSection'
import InstructorSection from '../Components/HomePage/InstructorSection'
import ExploreMore from '../Components/HomePage/ExploreMore'


const HomePage = () => {
  return (
    <div>
           {/* section1 */}
            <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'>
                <Link to={'/signup'}>
                     <div className=' group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit mt-16 '>
                        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 '>
                                 <p>Become and Instructor</p>
                                 <FaArrowRight/>
                        </div> 
                     </div>
                </Link>

                <div className='text-center flex flex-row text-4xl mt-4 font-semibold mb-7'>
                        Empower your future with  {" "}
                        <HighlighTextHome text={"Coding skills"}/>
                </div>

                <div className='w-[90%] mt-4 text-center text-lg font-bold text-richblack-300 '>
                    With our online coding courses, you can learn at your own pace , from anywhere in the 
                </div>

                <div className='flex flex-row gap-7 mt-8'>
                    <CTAButton active={true} linkTo={'/signup'}>
                        Learn More 
                    </CTAButton>

                    <CTAButton linkTo={'/login'} active={false}>
                        Book a Demo 
                    </CTAButton>
                </div>

                <div className='mx-3 my-12'>
                    <video muted loop autoPlay>
                            <source src={Banner} type='video/mp4'>
                            </source>
                    </video>
                </div>

                {/* code section 1  left text image on right div flex heading subheading 2 button  */}
                <div>
                        <CodeBlocks
                              position={"lg:flex-row"} 
                              heading={<div className='text-4xl font-semibold'>
                                  Unlock Your <HighlighTextHome text={'coding potential'}/>
                                  wit our online course 
                              </div>
                              }
                              subHeading={
                                "our course are designed and taugh by industry exper who have year of experience "
                              }
                              ctabtn1={     
                                {
                                    btnText:'try it out yourself',
                                    linkTo:'/signup',
                                    active:true ,
                                }
                              }
                              ctabtn2={
                                {
                                    btnText:'learn more',
                                    linkTo:'/login',
                                    active:false 
                                }
                              } 
                              codeblock={`
                                <!DOCTYPE html><html lang="en"><head><title>This is myPage</title></head><body><h1><a href="/">Header</a></h1><nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav> </body> </html>
                                `
                              } 
                            
                          
                        />
                </div>


                 <div>
                        <CodeBlocks
                              position={"lg:flex-row-reverse"} 
                              heading={<div className='text-4xl font-semibold'>
                                  Unlock Your <HighlighTextHome text={'coding potential'}/>
                                  wit our online course 
                              </div>
                              }
                              subHeading={
                                "our course are designed and taugh by industry exper who have year of experience "
                              }
                              ctabtn1={     
                                {
                                    btnText:'try it out yourself',
                                    linkTo:'/signup',
                                    active:true ,
                                }
                              }
                              ctabtn2={
                                {
                                    btnText:'learn more',
                                    linkTo:'/login',
                                    active:false 
                                }
                              } 
                              codeblock={`
                                <!DOCTYPE html><html lang="en"><head><title>This is myPage</title></head><body><h1><a href="/">Header</a></h1><nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav> </body> </html>
                                `
                              } 
                            
                          
                        />
                </div>
                    <ExploreMore/>
            </div>

           {/* section2 */}
           <div className='bg-pure-greys-5 text-richblack-700'>
               <div className='homepage_bg h-[310px]'>
                    
                    <div className='w-11/12 max-w-maxContent flex items-center gap-5 mx-auto'>
                        <div className='h-[150px]'></div>
                        <div className='flex flex-row gap-7 text-white'>
                              
                              {/* btn1 explore full catalog signup */}
                              <CTAButton active={true} linkTo={'/signup'}>
                                  <div className='flex items-center gap-2'>
                                    Explore Full Catalog
                                    <FaArrowRight/>
                                  </div>
                              </CTAButton>

                              {/* btn2 */}
                              <CTAButton active={false} linkTo={'/signup'}>
                                <div>
                                  Learn more
                                </div>
                              </CTAButton>
                        </div>  
                    </div>
               </div>

               <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                    
                    <div className='flex flex-row gap-5 mb-10 mt-[100px] '>
                      <div className='text-4xl font-semibold w-[45%]'>
                           Get the skills you need for a
                            <HighlighTextHome text={"Job that need is in demand"}/>
                      </div>  
                      <div className='flex flex-col gap-10 w-[40%] items-start'>
                          <div className='text-[16px]'>
                             The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                          </div>
                          <CTAButton active={true} linkTo={'/signup'}>
                            <div>Learn More</div>
                          </CTAButton>
                      </div>  

                    </div>

                     <TimelineSection/>
                   <LearningLanguageSection/>

               </div>
   



           </div>

           {/* section3 */}

           <div className='w-11/12 mx-auto flex flex-col gap-8 bg-richblack-900 text-white justify-between first-letter  max-w-maxContent items-center'>
                <InstructorSection/>

                <h2 className='text-4xl font-semibold text-center'>
                  review from other learners 
                </h2>
           </div>


           {/* footer */}
    </div>

  )
}

export default HomePage