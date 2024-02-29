import React from 'react';
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

const Header = () => {
  return (
    <div>
      <div className='w-full bg-gray-400 py-3 flex justify-evenly items-center border-b-2 border-gray-400'>
        <Link to='/'>
          <div className="flex items-center justify-center bg-gray-200 rounded-lg p-1">
            <h2 className='flex items-center justify-center bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-2 rounded-lg font-bold text-md sm:text-xl'>WISE</h2>
            <h2 className='tracking-tighter font-medium text-xl sm:text-xl' >Blog</h2>
          </div>
        </Link>
        <form className='flex items-center gap-5'>
          <input type='text' placeholder='Search...' className='p-2 rounded-lg' style={{ width: '480px' }} />
          <IoSearch className='w-6 h-6' />
        </form>
        <div className='flex gap-5'>
          <Link to='/' className='text-lg font-bold'>Home</Link>
          <Link to='/about' className='text-lg font-bold'>About</Link>
          <Link to='/sign-in' className='text-lg font-bold'>SignIn</Link>
          <Link to='/sign-up' className='text-lg font-bold'>SignUp</Link>
        </div>
        <div className='flex gap-2 md:order-2 items-center'>
          <button className='bg-gray-200 text-black rounded-full w-8 h-8 flex items-center justify-center'>
            <FaMoon />
          </button>
          <button className='p-2 m-2 rounded-3xl  bg-gray-200 text-black font-bold'>
            <Link to='/sign-in' className='text-md hover:text-white'>SignIn</Link>
          </button>
          <button className='p-2 m-2 rounded-3xl  bg-gray-200 text-black font-bold'>
            <Link to='/sign-up' className='text-md hover:text-white'>SignUp</Link>
          </button>
          <button className='bg-gray-200 text-black md:hidden'>
            <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header;
