import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPost from '../components/DashPost';
import DashUsers from '../components/DashUsers';
import DashboardComp from '../components/DashboardComp';


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
    <div className='w-full h-screen flex'>
      <div className='min-h-screen bg-gray-800' style={{backgroundColor : "rgb(31 41 55 / var(--tw-bg-opacity))",width : "18%"}}>
        <DashSidebar/>
      </div>
       {tab == 'profile' && <DashProfile/>}
       {tab == 'post' && <DashPost/>}
       {tab == 'users' && <DashUsers/>}
       {tab === 'dash' && <DashboardComp />}
    </div>
  )
}

export default Dashboard