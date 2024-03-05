import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";

const CreatePost = () => {
  const [file, setFile] = useState(null);

  const [imageUploadProgress, setImageUploadProgress] = useState(null);
 
  const [imageUploadError, setImageUploadError] = useState(null);

  const [imageUploadSuccess, setImageUploadSuccess] = useState(null);

  const [formData, setFormData] = useState({});

  const handleUpdloadImage = async (e) => {
    e.preventDefault()
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setImageUploadSuccess("Image Uploaded Successfully!!")
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen max-w-xl p-8">
      <div
        className="font-semibold text-center mb-5"
        style={{ paddingTop: "20px" }}
      >
        C R E A T E _ N E W _ P O S T
      </div>
      <form>
        <div
          className="flex items-center justify-center gap-5 "
          style={{ paddingTop: "50px" }}
        >
          <input
            type="text"
            placeholder="Title"
            id="title"
            className="p-2 rounded-lg border border-black"
            style={{ width: "520px" }}
          />
          <select className="text-black p-2 rounded-lg text-md font-semibold border border-black">
            <option className="font-semibold p-2" value="uncategorized">
              Select a Category
            </option>
            <option className="font-semibold p-2" value="JAVA">
              JAVA
            </option>
            <option className="font-semibold p-2" value="Javascript">
              Javascript
            </option>
            <option className="font-semibold p-2" value="React">
              React
            </option>
            <option className="font-semibold p-2" value="NextJS">
              NextJS
            </option>
          </select>
        </div>
        <div
          className="flex items-center justify-center"
          style={{ paddingTop: "50px" }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="p-2 m-2 bg-gradient-to-r from-cyan-500 to-cyan-800 rounded-lg font-semibold border border-black"
            onClick={handleUpdloadImage}
            disabled = {imageUploadProgress}
          >
           
           {
            imageUploadProgress ? (
                <div className="">
                {`${imageUploadProgress || 0}%`}  
                </div>
            ) : (
                'Upload Image'
            )
           }
          </button>
          {
            imageUploadSuccess && (
                <div className="bg-green-800 text-white p-2 rounded-lg font-semibold text-center" style={{width : '300px'}}>
                    {imageUploadSuccess}
                </div>

            )
          }
          {
            imageUploadError && (
                <div className="bg-red-800 text-white p-2 rounded-lg font-semibold text-center" style={{width : '300px'}}>
                    {imageUploadError}
                </div>

            )
          }
        </div>
        
        <ReactQuill
          theme="snow"
          className="text-black bg-white h-52 w-1/2 mx-auto border border-black"
          style={{ height: "208px", marginTop: "20px" }}
        />
        <div
          className="flex items-center justify-center"
          style={{ marginTop: "55px" }}
        >
          <button className="p-2 m-2 bg-gradient-to-r from-cyan-500 to-cyan-800 rounded-lg font-semibold border border-black ">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
