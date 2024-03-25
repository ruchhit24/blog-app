import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPost from '../components/DashPost';
import DashUsers from '../components/DashUsers';
import DashboardComp from '../components/DashboardComp';
import DashComment from '../components/DashComment';
import { useSelector } from 'react-redux';


const Dashboard = () => {
  const location = useLocation();
  const [tab,setTab ] = useState('')
  const { theme } = useSelector((state) => state.theme);

  const bgClass = theme === 'light' ? 'bg-white' : 'bg-[rgb(16,23,42)]';

  useEffect(()=>{
   const urlParams = new URLSearchParams(location.search);
   const tabFromUrl = urlParams.get('tab');
   console.log(tabFromUrl)
   setTab(tabFromUrl)
  },[location.search])
  return (
    <div className='w-full h-screen flex'>
      <div className={`min-h-screen ${bgClass} shadow-xl shadow-black`} style={{
  "--tw-bg-opacity": "1",
  "--tw-shadow": "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "--tw-shadow-colored": "0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color)",
  boxShadow: "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
  width: "18%"
}}
>

        <DashSidebar/>
      </div>
       {tab == 'profile' && <DashProfile/>}
       {tab == 'post' && <DashPost/>}
       {tab == 'users' && <DashUsers/>}
       {tab === 'comments' && <DashComment/>}
       {tab === 'dash' && <DashboardComp />}
    </div>
  )
}

export default Dashboard