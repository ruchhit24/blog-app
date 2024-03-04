import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaMoon, FaSun } from "react-icons/fa";
import { toggleTheme } from "../src/redux/theme/themeSlice";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../src/redux/user/userSlice";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const signoutHandler = async()=>{ 
    try {
      const res = await fetch('/api/user/signout',{
        method : 'POST'
      })
      const data = await res.json();
      if(!res.ok)
      {
        console.log("something went wrong witht the signout")
      }
      else{
        dispatch(signoutSuccess())
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="w-full bg-gray-400 py-3 flex justify-evenly items-center border-b-2 border-gray-400">
        <Link to="/">
          <div className="flex items-center justify-center bg-gray-200 rounded-lg p-1">
            <h2 className="flex items-center justify-center bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-2 rounded-lg font-bold text-md sm:text-xl">
              WISE
            </h2>
            <h2 className="tracking-tighter text-black font-medium text-xl sm:text-xl">
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
          <button
            onClick={() => dispatch(toggleTheme())}
            className="bg-gray-200 text-black rounded-full w-9 h-9 flex items-center justify-center"
          >
            {theme === "light" ? <FaSun /> : <FaMoon />}
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
                  className="w-9 h-9 rounded-full object-cover"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-1 py-2 w-50 bg-white border rounded-lg shadow-lg">
                  <div className="px-4">
                    <span className="block text-sm pb-2 font-semibold text-black">
                      @{currentUser.username}
                    </span>
                    <span className="border-t border-gray-200 block text-sm font-semibold py-2 text-black">
                      {currentUser.email}
                    </span>
                  </div>
                  <Link
                    to={"/dashboard?tab=profile"}
                    className="border-t border-gray-200 cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold uppercase"
                    onClick={closeDropdown}
                  >
                    Profile
                  </Link>

                  <button
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 font-bold uppercase" onClick={signoutHandler}
                  >
                    Sign out
                  </button>
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
           
        </div>
      </div>
    </div>
  );
};

export default Header;
