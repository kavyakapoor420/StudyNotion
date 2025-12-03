import React, { useState } from 'react'

import {HomePageExplore} from '../../data/homepage-explore'
import HighlighTextHome from '../../Pages/HighlighTextHome'
import CourseCards from './CourseCards'

const tabsName=[
    "free","new to coding","Most Popular","Skill Paths","Carrer Paths"

]


const ExploreMore = () => {

    const [currTab,setCurrTab]=useState(tabsName[0])
    const [courses,setCourse]=useState(HomePageExplore[0].courses)
    const [currCard,setCurrCard]=useState(HomePageExplore[0].courses[0].heading)


    const setMyCards=(value)=>{
        setCurrTab(value)
        const result=HomePageExplore.filter((course)=>course.tag===value)
        setCourse(result[0].courses)
        setCurrCard(result[0].courses[0].heading)

    }


  return (
    <div>
          <div className='text-center text-4xl font-semibold'>
            Unlock the 
            <HighlighTextHome text={"Power of code"}/>
          </div>

          <p className='text-center text-richblack-300 textlg text-[16px] mt-3 '>
            Learn to Build anything you can Imagine 
          </p>

          <div className='mt-5 mb-5 px-1 py-1  flex flex-row rounded-full bg-richblack-800 '>
            {
                tabsName.map((ele,indx)=>{
                    return(
                        <div key={indx} 
                             className={`text-[16px] flex flex-row items-center gap-2 ${currTab===ele ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200 "} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                             onClick={()=>setCurrCard(ele)}
                            >
                             {ele}
                        </div>
                    )
                })
            }
          </div>

          <div className="h-[150px]"></div>


          <div className='absolute flex flex-row gap-10 justify-between w-full '>
              {
                courses.map((ele,indx)=>{
                    return(
                        <CourseCards key={indx}
                                     cardData={ele}
                                     currCard={currCard}
                                     setCurrCard={setCurrCard}
                        />
                    )
                })
              }
          </div>
    </div>
  )
}

export default ExploreMore