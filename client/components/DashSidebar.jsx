import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signoutSuccess } from "../src/redux/user/userSlice";
import { useSelector } from "react-redux";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { LiaCommentsSolid } from "react-icons/lia";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FaReadme } from "react-icons/fa";

const DashSidebar = () => {
  const dispatch = useDispatch();

  const {currentUser} = useSelector((state) => state.user)
  const { theme } = useSelector((state) => state.theme);

  const bgClass = theme === 'light' ? 'bg-white' : 'bg-[rgb(16,23,42)]';

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("something went wrong witht the signout");
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`p-4 flex flex-col gap-2 text-white ${bgClass}`}>
      <Link to="/dashboard?tab=profile">
        <div
          className="rounded-lg cursor-pointer p-2 border border-b-0 border-gray-600 flex items-center gap-2 "
          style={{ backgroundColor: "rgb(63 63 70 / var(--tw-bg-opacity))" }}
        >
           <FaCircleUser /> 
          <div>Profile</div>
        </div>
      </Link>
      <Link to="/">
        <div
          className="rounded-lg cursor-pointer p-2 border border-b-0 border-gray-600 flex items-center gap-2 "
          style={{ backgroundColor: "rgb(63 63 70 / var(--tw-bg-opacity))" }}
        >
           <FaHome /> 
          <div>Home</div>
        </div>
      </Link>
      <Link to="/about">
        <div
          className="rounded-lg cursor-pointer p-2 border border-b-0 border-gray-600 flex items-center gap-2 "
          style={{ backgroundColor: "rgb(63 63 70 / var(--tw-bg-opacity))" }}
        >
           <FaReadme /> 
          <div>About</div>
        </div>
      </Link>
      {
        !currentUser.isAdmin && (
          <Link to="/search">
        <div
          className="rounded-lg cursor-pointer p-2 border border-b-0 border-gray-600 flex items-center gap-2 "
          style={{ backgroundColor: "rgb(63 63 70 / var(--tw-bg-opacity))" }}
        >
           <MdOutlineDocumentScanner/> 
          <div>All Posts</div>
        </div>
      </Link>
        )
      }

      {
        currentUser.isAdmin && (
          <Link to="/dashboard?tab=dash">
        <div
          className="rounded-lg cursor-pointer p-2 border border-b-0 border-gray-600 flex items-center gap-2 "
          style={{ backgroundColor: "rgb(63 63 70 / var(--tw-bg-opacity))" }}
        >
          
          <BsGraphUpArrow/>
          <div>Dashboard</div>
        </div>
      </Link>
        )
      }
      
      {
        currentUser.isAdmin && (
          <Link to="/dashboard?tab=post">
        <div
          className="rounded-lg cursor-pointer p-2 border border-b-0 border-gray-600 flex items-center gap-2 "
          style={{ backgroundColor: "rgb(63 63 70 / var(--tw-bg-opacity))" }}
        >
          
          <MdOutlineDocumentScanner />
          <div>All Posts</div>
        </div>
      </Link>
        )
      }

      {
        currentUser.isAdmin && (
          <Link to="/dashboard?tab=users">
        <div
          className="rounded-lg cursor-pointer p-2 border border-b-0 border-gray-600 flex items-center gap-2 "
          style={{ backgroundColor: "rgb(63 63 70 / var(--tw-bg-opacity))" }}
        >
          <TiGroup />
          <div>All Users</div>
        </div>
      </Link>
        )
      }
      {
        currentUser.isAdmin && (
          <Link to="/dashboard?tab=comments">
        <div
          className="rounded-lg cursor-pointer p-2 border border-b-0 border-gray-600 flex items-center gap-2 "
          style={{ backgroundColor: "rgb(63 63 70 / var(--tw-bg-opacity))" }}
        >
          <LiaCommentsSolid/>
          <div>All Comments</div>
        </div>
      </Link>
        )
      }
       
      <div
        className="rounded-lg cursor-pointer p-2 border border-b-0 border-gray-600  flex items-center gap-2 "
        style={{ backgroundColor: "rgb(63 63 70 / var(--tw-bg-opacity))" }}
      >
        <FaArrowRightLong />
        <div onClick={handleSignout}>SignOut</div>
      </div>
    </div>
  );
};

export default DashSidebar;
