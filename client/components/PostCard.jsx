import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div
      className="relative w-full border border-gray-700 overflow-hidden

    rounded-lg sm:w-[450px] hover:scale-105 duration-700 "
    >
    <Link to={`/post/${post.slug}`}> 
      <div>
          <img
            src={post.image}
            alt="post cover"
            className="w-full object-cover rounded-lg"
            style={{ height: "250px" }}
          />
       
        <div className="p-3 flex flex-col gap-2">
          <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
          <span className="italic text-sm">{post.category}</span>
        </div>
      </div>
      </Link>
    </div>
  );
}
