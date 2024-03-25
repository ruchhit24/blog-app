import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { updateStart,updateFailure,updateSuccess , updateSuccessMsg, deleteUserFailure ,deleteUserStart,deleteUserSuccess , signoutSuccess} from '../src/redux/user/userSlice'
import { Box, Modal, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const DashProfile = () => {

 const dispatch = useDispatch()

  const { currentUser , loading , errorMsg , successMsg} = useSelector((state) => state.user);

  const filePickerRef = useRef();

  const [image, setImage] = useState(null);

  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);

  const [imageFileUploadError, setImageFileUploadError] = useState(null);

 const [updatePhoto , setUpdatePhoto] = useState(false)

 const [imageFileUploading, setImageFileUploading] = useState('');

  
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const [formData,setFormData] = useState({});
 
 const[open,setOpen] = useState(false)

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);

  useEffect(()=>{
    dispatch(updateSuccessMsg(''))
    dispatch(updateFailure(''))
  },[])

  
  const handleImageChange = (e) => {
    const img = e.target.files[0];
    console.log(img);
    setImage(img);
  };

  const handleChange = (e)=>{
    setFormData({...formData , [e.target.id] : e.target.value})
    console.log(formData)
  }

  const handleOpen = ()=>{
    setOpen(true)
  }

  const handleClose= ()=>{
    setOpen(false)
  }

  const handleSubmit = async(e)=>{

    e.preventDefault();
    dispatch(updateSuccessMsg(''))
    dispatch(updateFailure(''))
    if(Object.keys(formData).length === 0)
    {
      dispatch(updateFailure('No Changes being Made!!'))
      return;
    }
    try {
      dispatch(updateStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData)
      })
      const data = await res.json();

      if(!res.ok)
      {
        dispatch(updateFailure(data.message))
      }
      else{
        dispatch(updateSuccess(data))
        dispatch(updateSuccessMsg('User Updated Successfully!!'))
      }
    } catch (error) {
      dispatch(updateFailure(error.message))
    }

  }
 
  const uploadImage = async () => {
    try {
      setImageFileUploading('Please !! Wait for image to get uploaded..');
      setUpdatePhoto(false)
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
          console.log(progress.toFixed(0))
        },
        (error) => {
          setImageFileUploadError("Could not upload image. Please try again.");
          console.error("Upload Error:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setImageFileUrl(downloadURL);
              console.log(downloadURL);
              setFormData({...formData,profilePicture : downloadURL})
              setImageFileUploading('');
              setUpdatePhoto(true);
            })
            .catch((error) => {
              console.error("Download URL Error:", error);
              setImageFileUploadError(
                "Could not get download URL for the uploaded image."
              );
            });
        }
      );
    } catch (error) {
      console.error("Upload Image Error:", error);
      setImageFileUploadError("An unexpected error occurred. Please try again.");
    }
  };

  const handleDelete = async() =>{
     setOpen(false)
     
     try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method : 'DELETE'
      })
      const data = await res.json();
      if(!res.ok)
      {
        dispatch(deleteUserFailure(data.message))
      }
      else{
        dispatch(deleteUserSuccess(data))
      }
     } catch (error) {
        dispatch(deleteUserFailure(error.message))
     }
  }

  const handleSignout = async()=>{
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
    <div className="w-1/2 mx-auto flex flex-col gap-5">
      <div className=" text-center p-4 text-xl font-semibold tracking-wider">
        <h1>P R O F I L E</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          onClick={()=>{ dispatch(updateSuccessMsg(''));
            dispatch(updateFailure(''))}}
          hidden
        />
        <div
          className="font-semibold flex items-center justify-center"
          
        >
          <img
            src={currentUser.profilePicture}
            alt="user"
            width={120}
            height={120}
            className="cursor-pointer object-cover overflow-hidden rounded-3xl hover:scale-105 duration-700"
            onClick={() => {filePickerRef.current.click()  }}
          />
        </div>
        <div className="flex flex-col items-center py-2 gap-2">
          <input
            style={{
              backgroundColor: "rgb(203 213 225 / var(--tw-bg-opacity)",
            }}
            type="text"
            id="username"
            placeholder="username"
            defaultValue={currentUser.username}
            className="text-black  bg-slate-300 p-2 rounded-lg"
            onChange={handleChange}
          />
          <input
            style={{
              backgroundColor: "rgb(203 213 225 / var(--tw-bg-opacity)",
            }}
            type="email"
            id="email"
            placeholder="email"
            defaultValue={currentUser.email}
            className="text-black p-2 rounded-lg bg-slate-300 "
            onChange={handleChange}
          />
          <input
            style={{
              backgroundColor: "rgb(203 213 225 / var(--tw-bg-opacity)",
            }}
            type="password"
            id="password"
            placeholder="password"
            defaultValue="*******"
            className="text-black p-2 rounded-lg bg-slate-300 "
            onChange={handleChange}
          />
          <button className="px-4 p-2 m-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-md rounded-lg cursor-pointer font-semibold" onClick={() => setUpdatePhoto(false)}>
           {loading ? "Updating..." : "Update"}
          </button>
          {
            currentUser.isAdmin && (
               <Link to={'/create-post'}>
               <button className=" px-4 p-2 m-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-md rounded-lg cursor-pointer font-semibold" onClick={() => setUpdatePhoto(false)}>
            Create Post
          </button>
               </Link>
            )
          }
        </div>
        <div className="flex justify-between">
          <span className="text-red-600 font-semibold cursor-pointer border border-b-2 p-2 rounded-lg" onClick= {()=> {setOpen(true)}}>
            Delete account
          </span>
          <span className="text-red-600 font-semibold cursor-pointer border border-b-2 p-2 rounded-lg" onClick={handleSignout}>
            SignOut
          </span>
        </div>
        {
          successMsg && (
            <div className="mt-5 text-md font-bold text-white bg-green-800 px-4 py-2 rounded-lg">
                {successMsg}
              </div>
          )
        }
        {
          errorMsg && (
            <div className="mt-5 text-md font-bold text-red-500 bg-red-800 px-4 py-2 rounded-lg">
                {errorMsg}
              </div>
          )
        }
        {
          imageFileUploading && (
            <div className="mt-5 text-md font-semibold text-white bg-red-800 px-4 py-2 rounded-lg">
                {imageFileUploading}
              </div>
          )
        }
        {
          updatePhoto && (
           
           <>
           
            <div className="mt-5 text-md font-bold  bg-gradient-to-r from-cyan-700 to-cyan-800 px-4 py-2 rounded-lg">
                "Click on Update to update the profile photo.."
              </div>
           </>

          )
        }
        
      </form>
 
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  className="flex flex-col justify-center items-center"
>
  <Box className = 'bg-white p-8 rounded-xl'>
    <Typography id="modal-modal-title" variant="h6" component="h2" className="capitalize" sx={{fontWeight : "bold"}}>
       Are you sure you want to Delete this Account ?
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }} className="flex justify-between">
       <button className="p-2 m-2 px-4 bg-red-800 hover:bg-red-600 text-white rounded-xl cursor-pointer hover:scale-105 duration-700 " onClick={handleDelete}>Are you Sure</button>
       <button className="p-2 m-2 px-4 bg-red-800 hover:bg-red-600 text-white rounded-xl cursor-pointer hover:scale-105 duration-700 " onClick={handleClose}>Cancel</button>
        
    </Typography>
  </Box>
</Modal> 
    </div>
  );
};

export default DashProfile;
  