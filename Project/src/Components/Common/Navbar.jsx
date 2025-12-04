import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import ProfileDropdown from '../ProfileDropdown'

import { categories } from '../../Services/api'
import { apiConnector } from '../../Services/apiConnector'

const subLinks=[
    {
      title:'python',
      link:"/catalog/python"
    },{
      title:'web dev',
      link:"/catalog/web-development"
    }
]

const Navbar = () => {

    const {token}=useSelector((state)=>state.auth)
    const {user}=useSelector((state)=>state.profile)
    const {totalItems}=useSelector((state)=>state.cart)

    // const [subLinks,setSubLinks]=useState([])

    // const fetchSubLinks=async()=>{
    //        try{
    //             const result=await apiConnector("GET",categories.CATEGORIES_API)
    //             console.log('printing sublinks results',result)
    //             setSubLinks(result.data.data)
    //        }catch(err){
    //              console.log('could not fetch the category list ')
    //        }
    //     }

    // useEffect(()=>{
    //       fetchSubLinks() 
    // },[])

    const location=useLocation() 
   const matchRoute=(route)=>{
    return matchPath({path:route},location.pathname)
   }

  return (
    <div className='flex h-14 items-center justify-center border-b-[2px] border-b-richblack-700'>
          <div className='w-11/12 max-w-maxContent items-center  justify-between '>
                 
                 <Link to={'/'}>
                      <img src={Logo} width={160} height={42} loading='lazy'/>
                 </Link>

                 {/* Nav Links unordered list  */}
                 <nav>
                        <ul className='flex gap-x-6 text-richblack-25'>
                            
                                {
                                    NavbarLinks.map((link,indx)=>(
                                         <li key={indx}>  
                                              {
                                                link.title==='Catalog' ? (
                                                <div className='relative  flex items-center gap-2 group'>
                                                      <p>{link?.title}</p>
                                                      <IoIosArrowDropdownCircle />
                                                        
                                                      <div className='invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[45%] flex flex-col rounded-md text-richblack-900 bg-richblack-5 p-4 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>
                                                                <div className="absolute left-[50%] top-0 rotate-45 rounded bg-richblack-5 h-6 w-6 translate-y-[80%] translate-x-[-50%] ">
                                                                          {
                                                                            subLinks.length ? (
                                                                                    
                                                                                      subLinks.map((subLink,indx)=>(
                                                                                          <Link key={indx} to={ `${subLink.link}`}>
                                                                                                <p>{subLink.link}</p>
                                                                                          </Link>
                                                                                      ))
                                                                                  
                                                                            )        : (
                                                                              <div></div>
                                                                            )
                                                                          }
                                                                </div>
                                                      </div>

                                                </div>
                                              ) :(
                                                   <Link to={link?.path}>
                                                        <p className={`${matchRoute(link?.path) ? "text-yellow-50" : "text-richblack-50"}`}>
                                                                {link.title}
                                                        </p>
                                                   </Link>
                                                )
                                              }
                                        </li>
                                    ))
                                }

                        </ul>
                 </nav>

    {/* token===null not logged in else signup btn but it token!=null profile dropdown menu && user && user!=Instructor */}
                  {/* login signup btns  */}
                  <div className='flex gap-x-4 items-center '>
                          
                          {
                             user && user?.accountType!=="Instructor" && (
                                <Link to='/dashboard/cart' className='relative'>
                                     <AiOutlineShoppingCart/>
                                     {
                                        totalItems>0 && (
                                          <span>
                                              {totalItems}
                                          </span>
                                        )
                                     }
                                </Link>
                             )
                          }

                          {
                             token==null && (
                                <Link to={'/login'}>
                                    <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[10px] rounded-md text-richblack-100'>
                                       LOGIN 
                                    </button>
                                </Link>
                             )
                          }
                          {
                            token===null && (
                              <Link to={'/signup'}>
                                     <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[10px] rounded-md text-richblack-100'>
                                      SIGNUP 
                                     </button>
                              </Link>
                            )
                          }

                          {
                            token!==null  && <ProfileDropdown/>
                          }

                  </div>
          </div>
    </div>
  )
}

export default Navbar