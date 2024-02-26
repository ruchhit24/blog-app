import { Button, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";


const Header = () => {
  return (
    <Navbar className='border-b-2 border-gray-400'>
    <Link to='/'>
    <div className='flex rounded-lg'>
        <h2 className='bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-2 rounded-lg tracking-tighter font-semibold text-md sm:text-xl'>Wise</h2>
        <h2 className='tracking-tighter font-medium text-md sm:text-xl'>Blog</h2>
      </div>
    </Link>
    <form>
        <TextInput type='text' placeholder='Search...' rightIcon={IoSearch} className=''/>
    </form>
    <div className='flex gap-2 md:order-2'>
     <Button className='bg-gray-200 text-black' pill>
     <FaMoon />
     </Button>
     <Button className='w-14 h-14 bg-gray-200 text-black font-semibold'>
        SignIn
     </Button>
     <NavbarToggle/>
    </div>
    <NavbarCollapse>
        <NavbarLink>
            <Link to='/'>Home</Link>
        </NavbarLink>
        <NavbarLink>
            <Link to='/about'>About</Link>
        </NavbarLink>
        <NavbarLink>
            <Link to='/sign-in'>SignIn</Link>
        </NavbarLink>
        <NavbarLink>
            <Link to='/sign-up'>SignUp</Link>
        </NavbarLink>
    </NavbarCollapse>

      

    </Navbar>
  )
}
export default Header
