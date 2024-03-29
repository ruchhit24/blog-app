import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { siginInStart, signInSuccess, signInFailure , signInStarting } from '../src/redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Oauth from "../components/Oauth.jsx";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect (()=>{
    dispatch(signInStarting())
  },[])

  const [form, setForm] = useState({});
  const { loading, errorMsg } = useSelector(state => state.user);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!form.email || !form.password) {
       return dispatch(signInFailure("All fields are Required!!"));
     
    }
    try {
      dispatch(siginInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure('INCORRECT CREDENTIALS!!!'));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className=" flex flex-col w-1/2 h-full items-center font-semibold tracking-tight leading-none gap-5" >
          <div className="flex items-center justify-center bg-gray-200 rounded-lg " style={{ paddingRight: '20px', width: '100px', height: '40px', }}>
            <h2 className='flex items-center justify-center bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-2 rounded-lg font-semibold text-xl sm:text-xl' style={{ width: '100px', height: '40px' }}>WISE</h2>
            <h2 className='tracking-tighter font-medium text-xl sm:text-xl text-black'>Blog</h2>
          </div>
          <div className="text-lg leading-none tracking-tighter text-center">
            Welcome to Wise Blog. You can sign up with your email and password or with Google.
         </div>
        </div>
        <div className="w-1/2 h-full flex justify-center items-center" >
          <div className=" p-4 m-2" style={{ width: '480px' }}>
            {errorMsg && (
              <div className="mb-5 text-md font-semibold text-red-600 bg-red-300 px-4 py-2 rounded-lg">
                {errorMsg}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col p-4 gap-2">
                <label className="text-lg font-semibold tracking-tighter leading-none">Email</label>
                <input type="email" id="email" onChange={changeHandler} className="border-2 border-black p-2 rounded-lg text-md text-black font-semibold" placeholder="enter ur email" name="email" />
              </div>
              <div className="flex flex-col p-4 gap-2 ">
                <label className="text-lg font-semibold tracking-tighter leading-none ">Password</label>
                <input type="password" id="password" onChange={changeHandler} className="border-2 border-black p-2 rounded-lg text-md text-black" placeholder="enter ur password" name="password" />
              </div>
              <div className="flex items-center justify-center p-4">
                <button className="p-2 m-2 bg-gradient-to-r from-cyan-500 to-cyan-700 text-white w-full rounded-lg text-lg font-semibold cursor-pointer hover: scale-105" disabled={loading}>{loading ? "Loading..." : "SignIn"}</button>
              </div>
              
            <Oauth/>
            </form> 
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
