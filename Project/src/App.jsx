import React from 'react'
import {Routes,Route} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Footer from './Components/Common/Footer'
import Navbar from './Components/Common/Navbar'
import Recipes from './Components/Recipes'
import CourseDetailsPage from './Pages/CourseDetailsPage'
const App = () => {
  return (
    <div className='w-screen min-h-screen bg-richblack-900'>


       <Navbar/>
          <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/courses/:courseId' element={<CourseDetailsPage/>}/>
          </Routes>
       <Footer/>

    </div>
  )
}

export default App


// import Quotes from "./Components/Quotes"
// import Recipes from "./Components/Recipes"


// const App=()=>{

//   return(
//     <>
//        <Recipes/>
//        <Quotes/>
//     </>
//   )
// }

// export default App 