import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'

const Navbar = () => {
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
                                    NavbarLinks.map((link,indx)=>{
                                        return(
                                            <li key={indx}>
                                                
                                            </li>
                                        )
                                    })
                                }

                        </ul>
                 </nav>
          </div>
    </div>
  )
}

export default Navbar