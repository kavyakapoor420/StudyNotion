import React from 'react'
import {Link} from 'react-router-dom'

const BottomFotter=["Privacy Policy","Cookie Policy","Terms"]
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];

const Plans=["Paid memberships","For studetns","business solution"]
const Community=["Forums","Chapters","Events"]


const Footer = () => {
  return (
    <div className='bg-richblack-800'>
        <div className='flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14'>
            <div className='border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700'>

                {/* section1  */}
                <div className='lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r bg:border-richblack-700 pl-3 lg:pr-5 gap-3'>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer