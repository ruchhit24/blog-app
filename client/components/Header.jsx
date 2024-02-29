import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

import { useSelector } from "react-redux";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div>
      <div className="w-full bg-gray-400 py-3 flex justify-evenly items-center border-b-2 border-gray-400">
        <Link to="/">
          <div className="flex items-center justify-center bg-gray-200 rounded-lg p-1">
            <h2 className="flex items-center justify-center bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-2 rounded-lg font-bold text-md sm:text-xl">
              WISE
            </h2>
            <h2 className="tracking-tighter font-medium text-xl sm:text-xl">
              Blog
            </h2>
          </div>
        </Link>
        <form className="flex items-center gap-5">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-lg"
            style={{ width: "480px" }}
          />
          <IoSearch className="w-6 h-6" />
        </form>
        <div className="flex gap-5">
          <Link to="/" className="text-lg font-bold">
            Home
          </Link>
          <Link to="/about" className="text-lg font-bold">
            About
          </Link>
          <Link to="/sign-in" className="text-lg font-bold">
            SignIn
          </Link>
          <Link to="/sign-up" className="text-lg font-bold">
            SignUp
          </Link>
        </div>
        <div className="flex gap-2 md:order-2 items-center">
          <button className="bg-gray-200 text-black rounded-full w-9 h-9 flex items-center justify-center">
            <FaMoon />
          </button>
           
            {currentUser ? (
              <div className="relative">
                <button
                  className="bg-gray-200 w-9 h-9 rounded-full text-white font-semibold"
                  onClick={handleDropdownToggle}
                >
                  <img
                    src={currentUser.profilePicture}
                    alt="user"
                    className="w-9 h-9 rounded-full"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-1 py-2 w-50 bg-white border rounded-lg shadow-lg">
                    <div className="px-4">
                      <span className="block text-sm pb-2 font-semibold">
                        @{currentUser.username}
                      </span>
                      <span className="border-t border-gray-200 block text-sm font-semibold py-2">
                        {currentUser.email}
                      </span>
                    </div>
                    <div className="border-t border-gray-200">
                      <Link
                        to={"/dashboard?tab=profile"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold uppercase"
                      >
                        Profile
                      </Link>
                      <button 
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 font-bold uppercase"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/sign-in">
                <button className="p-2 m-2 rounded-lg bg-purple-600 text-white font-semibold">
                  Sign In
                </button>
              </Link>
            )} 
          <button className="p-2 m-2 rounded-3xl  bg-gray-200 text-black font-bold">
            <Link to="/sign-up" className="text-md hover:text-white">
              SignUp
            </Link>
          </button>
          <button className="bg-gray-200 text-black md:hidden">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
