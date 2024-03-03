import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { updateStart,updateFailure,updateSuccess } from '../src/redux/user/userSlice'

const DashProfile = () => {

 const dispatch = useDispatch()

  const { currentUser } = useSelector((state) => state.user);

  const filePickerRef = useRef();

  const [image, setImage] = useState(null);

  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);

  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const [formData,setFormData] = useState({});
 

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);

  
  const handleImageChange = (e) => {
    const img = e.target.files[0];
    console.log(img);
    setImage(img);
  };

  const handleChange = (e)=>{
    setFormData({...formData , [e.target.id] : e.target.value})
    console.log(formData)
  }

  const handleSubmit = async(e)=>{

    e.preventDefault();

    if(Object.keys(formData).length === 0)
    {
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
      }
    } catch (error) {
      dispatch(updateFailure(error.message))
    }

  }

  const uploadImage = async () => {
    try {
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
          hidden
        />
        <div
          className="font-semibold flex items-center justify-center"
          
        >
          <img
            src={currentUser.profilePicture}
            alt="user"
            width={380}
            height={380}
            className="cursor-pointer rounded-3xl hover:scale-105 duration-700"
            onClick={() => filePickerRef.current.click()}
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
          <button type="submit" className="p-2 m-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-md rounded-lg cursor-pointer font-semibold">
            Update
          </button>
        </div>
        <div className="flex justify-between">
          <span className="text-red-600 font-semibold cursor-pointer border border-b-2 p-2 rounded-lg">
            Delete account
          </span>
          <span className="text-red-600 font-semibold cursor-pointer border border-b-2 p-2 rounded-lg">
            SignOut
          </span>
        </div>
      </form>
    </div>
  );
};

export default DashProfile;
