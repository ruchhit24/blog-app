import React, { useEffect, useState } from "react";
import { useSelector  } from "react-redux";
import { Link , useNavigate} from "react-router-dom";
import Comment from './Comment'

const CommentSection = ({ postId }) => {
 
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate()

  const [comment, setComment] = useState("");

  
  const [commentError, setCommentError] = useState(null);

  const [comments, setComments] = useState([]);
  
  console.log('comments = ',comments );
  console.log('comment = ',comment)
 
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);


  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(comment.length > 200)
    {
        return;
    }
    try {
        setCommentError(null)
        const res = await fetch('/api/comment/create',{
            method : 'POST',
            headers : {
                'Content-Type' : 'Application/json'
            },
            body : JSON.stringify({
                content : comment,
                postId,
                userId : currentUser._id
            })
        })

        const data = await res.json()
        if(res.ok){ 
            setComment('')
            setCommentError(null)
            setComments([data,...comments])
        }
        console.log(data)

    } catch (error) {
        setCommentError(error.message)
    }
  }

  const handleLike = async(commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
 
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
    console.log("comments edited", comments)
  };
  return (
    <div
      style={{ borderTopWidth: "1px", borderColor: "gray", paddingTop: "18px" }}
    >
      { currentUser && (
        <div className="flex items-center gap-2 font-semibold">
        <p>SignedIn as : </p>
        <img
          src={currentUser.profilePicture}
          alt="uf"
          className="h-6 w-6 object-cover rounded-full"
        />
        <Link to="/dashboard?tab=profile" className="hover:underline">
          @{currentUser.username}
        </Link>
      </div>
      )}

      {currentUser ? (
        <>
          <form onSubmit={handleSubmit} className=" flex flex-col items-center p-3">
            <textarea
              className=" text-black p-2 rounded-lg bg-gray-300"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              maxLength={200}
              style={{ height: "86px", width: "500px" }}
            />
            <div
              className="flex items-center"
              style={{ justifyContent: "space-between", width: "500px" }}
            >
              <p className="text-gray-500 text-md font-semibold capitalize">
                {200 - comment.length} characters remaining
              </p>
              <button type="submit" className="px-4 p-2 m-2 bg-gradient-to-r from-cyan-500 to-cyan-800 rounded-lg font-semibold">
                Comment
              </button>
            </div>
          </form>
         {
          comments.map((com)=>(
            <Comment singleComment={com} key={com._id} like={handleLike}/>
          ))
         }
          
        </>
      ) : (
         <div>
         <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
       
        {/* Each comments */}
        {
          comments.length > 0 ? ( comments.map((com)=>(
            <Comment singleComment={com} key={com._id} like={handleLike} onEdit={handleEdit}/>
          ))) : (
            <div className="text-md text-teal-400 my-5 flex gap-1 font-semibold ">
          No Comments yet !!
           
        </div>
          )
         }
         </div>
      )}
    </div>
  );
};

export default CommentSection;
