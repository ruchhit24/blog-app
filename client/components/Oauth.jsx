import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../src/user/userSlice";


const Oauth = () => {
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider)
      const res = await fetch('/api/auth/googleOAuth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              name: resultsFromGoogle.user.displayName,
              email: resultsFromGoogle.user.email,
              googlePhotoUrl: resultsFromGoogle.user.photoURL,
          }),
          })
      const data = await res.json()
      if (res.ok){
          dispatch(signInSuccess(data))
          navigate('/')
      }
    }catch (error) {
      console.log(error);
  }
}

  return  (
     <div className="relative flex justify-center">
         
        <button onClick={handleGoogle} className="p-2 m-2 rounded-lg w-1/2 bg-gradient-to-r from-cyan-900 to-cyan-600 text-white font-semibold "><span className='inline-block pr-2'><FcGoogle className='w-5 h-5 pt-1' /></span>Continue with Google</button>
     </div>

  )
};

export default Oauth;
