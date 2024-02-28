import { Alert } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
 const navigate = useNavigate();

  const [form,setForm] = useState({});
  const[errorMsg,setErrorMsg]= useState(null);
  const [loading,setLoading] = useState(false);

  const changeHandler = (e)=>{
    setForm({...form,[e.target.id] : e.target.value.trim()});
    console.log(form)
  }

 const handleSubmit = async(e) =>{
  e.preventDefault(); 
  if( !form.email || !form.password )
  {
    return setErrorMsg('all fields are required !!!')
  }
 try {
   setLoading(true)
   setErrorMsg(null)
   const res = await fetch('/api/auth/signin',{
    method : 'POST',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify(form),
   })
   console.log(res);
   const data = await res.json();
   if(data.success === false)
   {
    return setErrorMsg(' please check your email')
   }
   setLoading(false)
   if(res.ok){
    navigate('/')
   }
  
 } catch (error) {
    setErrorMsg(error.message)
    setLoading(false)
 }
 }
  return (
    <>
       <div className="w-full min-h-screen flex items-center justify-center relative">
       <div className="flex flex-col w-1/2 h-full items-center font-semibold tracking-tight leading-none" style={{marginTop : '262px'}}>
       <div className="flex items-center justify-center bg-gray-200 rounded-lg " style={{paddingRight : '20px', width : '100px', height : '40px',marginBottom : '20px'}}>
        <h2 className='flex items-center justify-center bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-2 rounded-lg font-semibold text-xl sm:text-xl' style={{width : '100px',height : '40px'}}>WISE</h2>
        <h2 className='tracking-tighter font-medium text-xl sm:text-xl'>Blog</h2>
      </div>
          <p className=" text-lg leading-none tracking-tighter text-center">
         This is a demo project. You can sign up with your email and password or with Google.
         </p>
        </div>
        <div className="w-1/2 h-full flex justify-center items-center" >
          <div className=" p-4 m-2 absolute" style={{width : '480px',marginTop : '200px'}}>
            {
              errorMsg && (
                <Alert className="mb-5" color='failure'>
                  {errorMsg}
                </Alert>
              )
            }
            <form onSubmit={handleSubmit}>
                
               <div className="flex flex-col p-4 gap-2">
               <label className="text-lg font-semibold tracking-tighter leading-none">Email</label>
              <input type="email" id="email" onChange={changeHandler} className="border-2 border-black p-2 rounded-lg text-md capitalize" placeholder="enter ur email" name="email"/>
               </div>
               <div className="flex flex-col p-4 gap-2">
               <label className="text-lg font-semibold tracking-tighter leading-none ">Password</label>
              <input type="password" id="password" onChange={changeHandler} className="border-2 border-black p-2 rounded-lg text-md capitalize" placeholder="enter ur password" name="password"/>
               </div>
               <div className="flex items-center justify-center p-4">
               <button className="p-2 m-2 bg-gradient-to-r from-cyan-500 to-cyan-700 text-white w-full rounded-lg text-lg font-semibold cursor-pointer hover: scale-105" disabled={loading}>{loading ? "Loading..." : "SignIn"}</button>
               </div>
            </form>
          </div>
        </div>
    </div>
    </>
  );
};

export default SignIn;
