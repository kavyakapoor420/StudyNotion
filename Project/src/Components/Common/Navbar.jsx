import React from 'react'
import { Link, matchPath } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'

const Navbar = () => {

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
                                                link.title==='Catalog' ? (<div></div>) :(
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
                  <div className='flex gap-4 '>

                  </div>
          </div>
    </div>
  )
}

export default Navbar