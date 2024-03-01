import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const DashProfile = () => {

    const {currentUser} = useSelector((state) => state.user)

    const filePickerRef = useRef();

    const [image, setImage] = useState(null);

    const handleImageChange = (e)=>{
        const img = e.target.files[0];
        console.log(img)
        setImage(img)
       }

       useEffect(()=>{
        if(image)
        {
            uploadImage();
        }
       },[image])
  return (
    <div className='w-1/2 mx-auto flex flex-col gap-5'>
             <div className=' text-center p-4 text-xl font-semibold tracking-wider'>
             <h1>P R O F I L E</h1>
             </div>
            <form>
                <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
                 <div className= "font-semibold flex items-center justify-center cursor-pointer" onClick={()=> filePickerRef.current.click()}>
                 <img src={currentUser.profilePicture} alt="user" width={380} height={380} className="rounded-3xl"/>
                 </div>
                 <div className='flex flex-col items-center py-2 gap-2'>
                 <input style={{  backgroundColor: "rgb(203 213 225 / var(--tw-bg-opacity)"}} type='text' id='username' placeholder='username' defaultValue={currentUser.username} className='text-black  bg-slate-300 p-2 rounded-lg'/>
                 <input style={{  backgroundColor: "rgb(203 213 225 / var(--tw-bg-opacity)"}} type='email' id='email' placeholder='email' defaultValue={currentUser.email} className='text-black p-2 rounded-lg bg-slate-300 '/>
                 <input style={{  backgroundColor: "rgb(203 213 225 / var(--tw-bg-opacity)"}} type='password' id='password' placeholder='password' defaultValue= "*******" className='text-black p-2 rounded-lg bg-slate-300 '/>
                 <button className='p-2 m-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-md rounded-lg cursor-pointer font-semibold'>Update</button>
                 </div>
                 <div className='flex justify-between'>
                    <span className='text-red-600 font-semibold cursor-pointer border border-b-2 p-2 rounded-lg'>Delete account</span>
                    <span className='text-red-600 font-semibold cursor-pointer border border-b-2 p-2 rounded-lg'>SignOut</span>
                 </div>
                 

            </form>


    </div>
  )
}

export default DashProfile