import { Button, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";


const Header = () => {
  return (
    <div >
         <Navbar className=' border-b-2 border-gray-400' style={{paddingBottom : '30px'}}>
    <Link to='/'>
    <div className="flex items-center justify-center bg-gray-200 rounded-lg" style={{paddingRight : '20px', width : '100px', height : '40px' , paddingLeft : '30px'}}>
        <h2 className='flex items-center justify-center bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-2 rounded-lg font-semibold text-xl sm:text-xl' style={{width : '100px',height : '40px'}}>WISE</h2>
        <h2 className='tracking-tighter font-medium text-xl sm:text-xl' style={{paddingRight : '25px'}}>Blog</h2>
      </div>
    </Link>
    <form>
        <TextInput type='text' placeholder='Search...' rightIcon={IoSearch}
            style={{width : '480px'}}
        />
    </form>
    <NavbarCollapse>
        <NavbarLink>
            <Link to='/' className='text-lg font-bold'>Home</Link>
        </NavbarLink>
        <NavbarLink>
            <Link to='/about' className='text-lg font-bold'>About</Link>
        </NavbarLink>
        <NavbarLink>
            <Link to='/sign-in' className='text-lg font-bold'>SignIn</Link>
        </NavbarLink>
        <NavbarLink>
            <Link to='/sign-up' className='text-lg font-bold'>SignUp</Link>
        </NavbarLink>
    </NavbarCollapse>
    <div className='flex gap-2 md:order-2'>
     <Button className='bg-gray-200 text-black' pill>
     <FaMoon />
     </Button>
     <Button className='w-14 h-14 bg-gray-200 text-black font-semibold'>
         <Link to= '/sign-in' className='text-md hover:text-white'>SignIn</Link>
     </Button>
     <Button className='w-14 h-14 bg-gray-200 text-black font-semibold'>
         <Link to= '/sign-up' className='text-md hover:text-white'>SignUp</Link>
     </Button>
     <NavbarToggle/>
    </div>
   

      

    </Navbar>
    </div>
  )
}
export default Header
