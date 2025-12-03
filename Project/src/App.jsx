import React from 'react'
import {Routes,Route} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Footer from './Components/Common/Footer'
const App = () => {
  return (
    <div className='w-screen min-h-screen bg-richblack-900'>
       <Routes>
          <Route path='/' element={<HomePage/>}/>
       </Routes>
       <Footer/>
    </div>
  )
}

export default App