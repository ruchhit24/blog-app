import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';


const Dashboard = () => {
  const location = useLocation();
  const [tab,setTab ] = useState('')

  useEffect(()=>{
   const urlParams = new URLSearchParams(location.search);
   const tabFromUrl = urlParams.get('tab');
   console.log(tabFromUrl)
   setTab(tabFromUrl)
  },[location.search])
  return (
    <div className='w-full min-h-screen flex'>
      <div className=' bg-gray-800' style={{backgroundColor : "rgb(31 41 55 / var(--tw-bg-opacity))",width : "18%"}}>
        <DashSidebar/>
      </div>
      <div className=''>profile</div>
    </div>
  )
}

export default Dashboard