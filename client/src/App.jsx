 import React from 'react'
 import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import About from '../Pages/About'
import SignUp from '../Pages/SignUp'
import Dashboard from '../Pages/Dashboard'
import Header from '../components/Header'
import SignIn from '../Pages/SignIn'
import Footer from '../components/Footer'
import PrivateRoute from '../components/PrivateRoute'
 const App = () => {
   return (
     <BrowserRouter>
     <Header/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Route> 
     </Routes>
    <Footer/>
     </BrowserRouter>
   )
 }
 
 export default App