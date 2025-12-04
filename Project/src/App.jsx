// import React from 'react'
// import {Routes,Route} from 'react-router-dom'
// import HomePage from './Pages/HomePage'
// import Footer from './Components/Common/Footer'
// import Navbar from './Components/Common/Navbar'
// import Recipes from './Components/Recipes'
// const App = () => {
//   return (
//     <div className='w-screen min-h-screen bg-richblack-900'>

import Quotes from "./Components/Quotes"
import Recipes from "./Components/Recipes"

//        <Navbar/>
//           <Routes>
//               <Route path='/' element={<HomePage/>}/>
//           </Routes>
//        <Footer/>
       
//        <Recipes/>

//     </div>
//   )
// }

// export default App


const App=()=>{

  return(
    <>
       <Recipes/>
       <Quotes/>
    </>
  )
}

export default App 