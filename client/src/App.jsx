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
import CreatePost from '../Pages/CreatePost'
import PrivateAdminRoute from '../components/PrivateAdminRoute'
import UpdatePost from '../Pages/UpdatePost'
import PostPage from '../Pages/PostPage'
import { ScrollToTop } from '../components/ScrollToTop'
import Search from '../Pages/Search'
 const App = () => {
   return (
     <BrowserRouter>
     <ScrollToTop/>
     <Header/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/search' element={<Search />} />
      <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Route> 
      <Route element={<PrivateAdminRoute/>}>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/update-post/:postId' element={<UpdatePost/>}/>
      </Route>
      <Route path='/post/:postSlug' element = {<PostPage/>}/>
     </Routes>
    <Footer/>
     </BrowserRouter>
   )
 }
 
 export default App