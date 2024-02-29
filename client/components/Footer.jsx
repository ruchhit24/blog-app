import React from 'react'
import { Link } from 'react-router-dom'
import { CiInstagram } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaGithub } from "react-icons/fa";
import {   useSelector } from 'react-redux';
const Footer = () => {
  const {theme} = useSelector(state=> state.theme)
  return (
    <div className='w-full border border-t-2 border-gray-600' style={{marginTop : '150px',height : '200px' }}>
      <div className=' h-full  mx-auto flex' style={{width : '1200px'}}>
        <div className='w-1/2 h-full flex justify-center items-center'>
        <Link to='/'>
    <div className="flex items-center justify-center bg-gray-200 rounded-lg" style={{paddingRight : '20px', width : '100px', height : '40px' , paddingLeft : '30px' }}>
        <h2 className='flex items-center justify-center bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-2 rounded-lg font-semibold text-xl sm:text-xl' style={{width : '100px',height : '40px'}}>WISE</h2>
        <h2 className='tracking-tighter font-medium text-xl sm:text-xl' style={{paddingRight : '25px'}}>Blog</h2>
      </div>
    </Link>
        </div>
        <div className='w-1/2 h-full flex flex-col justify-between'>
            <div className='flex justify-between items-center mt-6'>
            <div className=''>
             <h3 className='text-xl font-semibold leading-none'>ABOUT</h3>
            <h2>lets do it</h2>
            <h2>wise blogsss</h2>
             </div>
             <div>
             <h3 className='text-xl font-semibold leading-none'>FOLLOW US</h3>
            <h2>Github</h2>
            <h2>Discord</h2>
             </div>
             <div>
             <h3 className='text-xl font-semibold leading-none'>LEGAL</h3>
            <h2>Privacy Policy</h2>
            <h2>Terms & Conditions</h2>
             </div>
            </div>
            <div className='flex mb-6 space-x-4'>
             <Link to='https://www.facebook.com/'>
               <CiInstagram  style={{width : '30px',height : '30px'}}/>
             </Link>
            <FaXTwitter style={{width : '30px',height : '30px'}}/>
            <FaFacebook style={{width : '30px',height : '30px'}}/>
            <FaGithub style={{width : '30px',height : '30px'}} />
            </div>
        </div>
      </div> 
    </div>
  )
}

export default Footer