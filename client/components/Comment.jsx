import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FaRegThumbsUp } from "react-icons/fa";
import { useSelector } from 'react-redux';


const Comment = ({singleComment , like , onEdit}) => {

    const [user, setUser] = useState({ });
    console.log(user)

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(singleComment.content);

    const { currentUser } = useSelector((state) => state.user);

 
    useEffect(() => {
        const getUser = async () => {
       try {
         const res = await fetch(`/api/user/${singleComment.userId}`);
         const data = await res.json();
         if (res.ok) {
           setUser(data);
         }
       } catch (error) {
         console.log(error.message);
       }
     };
     getUser();
   }, [singleComment]);

   const handleEdit = () => {
       setIsEditing(true);
    		setEditedContent(singleComment.content);
   }

   const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${singleComment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(singleComment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
 
    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
        <div className='flex-shrink-0 mr-3'>
          <img
            className='w-10 h-10 rounded-full bg-gray-200 object-cover'
            src={user.profilePicture}
            alt={user.username}
          />
        </div>
        <div className='flex-1'>
          <div className='flex items-center mb-1'>
            <span className='font-bold mr-1 text-xs truncate'>
              {user ? `@${user.username}` : 'anonymous user'}
            </span>
            <span className='text-gray-500 text-xs'>
              {moment(singleComment.createdAt).fromNow()}
            </span>
          </div>


          {isEditing ? (
          <>
            <input
              className='mb-2 text-black w-full p-3 rounded-lg font-semibold'
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              
            />
            <div className='flex justify-start gap-2 text-xs'>
              <button
                type='button'
                className='p-2 px-4 bg-gradient-to-r from-cyan-500 to-cyan-800 rounded-lg font-semibold text-white ' 
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type='button'
                className='p-2 px-4 bg-red-700 border-[1px] border-white  rounded-lg font-semibold text-white '
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
          <p className='text-gray-500 pb-2'>{singleComment.content}</p>
            <div className='flex items-center pt-2 text-xs max-w-fit gap-2'>
              <button
                type='button'
                onClick={() => like(singleComment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  singleComment.likes.includes(currentUser._id) &&
                  '!text-blue-500'
                }`}
              >
                <FaRegThumbsUp className='text-sm' />
              </button>
              <p className='text-gray-400'>
                {singleComment.numberOfLikes > 0 && singleComment.numberOfLikes + ' ' +
                    (singleComment.numberOfLikes === 1 ? 'like' : 'likes')}
              </p>
              {currentUser &&
              (currentUser._id === singleComment.userId || currentUser.isAdmin)      

              && (
                  <>
                    <button
                      type='button'
                      onClick={handleEdit}
                      className='text-gray-400 hover:text-blue-500'
                    >
                      Edit
                    </button>
                   </>
              )
              } 
            </div>
          </>
        )  }
       </div>
       </div>
  )
}

export default Comment