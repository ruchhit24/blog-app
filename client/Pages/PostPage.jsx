import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";

const PostPage = () => {
  const { postSlug } = useParams();

  const[error,setError] = useState(false)
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getPost?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  
  return (
     loading ? (
      <div>LOADING....</div>
     ) : (
       post && (
        <div
      className="min-h-screen p-3 max-w-3xl mx-auto"
      style={{ maxWidth: "880px" }}
    >
      <h1
        className=" text-3xl text-center"
        style={{
          fontSize: "2.875rem",
          lineHeight: "4.25rem" /* 36px */,
          marginTop: "28px",
        }}
      >
        { post.title}
      </h1>

      <img
        src={ post.image}
        alt={ post.title}
        className="mt-10 p-3 max-h-[500px] w-full object-cover rounded-lg"
        style={{ maxHeight: "500px", borderRadius: "8px" }}
      />

      <div className="flex justify-between p-3 border-b-[1px] border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{ new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html:  post.content }}
      ></div>

      <CommentSection postId={ post._id}/>
    </div>
       )
     )
  );
};

export default PostPage;
