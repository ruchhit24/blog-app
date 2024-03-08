import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className='relative w-full border border-teal-500 

hover:border-2 overflow-hidden rounded-lg sm:w-[430px] 

transition-all'>
       <div>
       <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='w-full object-cover transition-all duration-300'style={{height : '250px'}}
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='italic text-sm'>{post.category}</span>
        
      </div>
       </div>
       <div className='w-full flex flex-col justify-end' style={{marginBottom : '0px'}}>
       <Link
          to={`/post/${post.slug}`}
          className='w-full p-2 bg-gradient-to-r from-cyan-500 to-cyan-800 rounded-lg font-semibold border border-black text-center'
        >
          Read article
        </Link>
       </div>
    </div>
  );
}