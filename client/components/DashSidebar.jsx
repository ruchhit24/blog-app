import React from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const DashSidebar = () => {
  return (
    
        <div className='p-4 flex flex-col gap-2'>
        <Link to='/dashboard?tab=profile'>
        <div className='rounded-lg cursor-pointer p-2 border border-b-0 border-gray-600 flex items-center gap-2 ' style={{backgroundColor : "rgb(63 63 70 / var(--tw-bg-opacity))"}}>
            <FaCircleUser/>
            <div>Profile</div>
            
        </div>  
                </Link>
             
        <div className='rounded-lg cursor-pointer p-2 border border-b-0 border-gray-600  flex items-center gap-2 ' style={{backgroundColor : "rgb(63 63 70 / var(--tw-bg-opacity))"}}>
            <FaArrowRightLong/>
            <div>SignOut</div>
        </div>
        </div>
  )
}

export default DashSidebar