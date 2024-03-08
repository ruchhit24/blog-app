import { Link } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPost');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 px-3 max-w-6xl mx-auto ' style={{marginTop : '30px'}}>
        <h1 className='text-7xl  font-bold lg:text-6xl font-serif' style={{ fontSize: '4.5rem',
    lineHeight: '1.5',paddingTop : '24px',letterSpacing: '0.05em'}}>Welcome to<span className='text-cyan-500'> Wise</span>Blog</h1>
        <p className='text-gray-500 w-2/3 leading-6 tracking-wider sm:text-sm' style={{
    lineHeight: '1.3',paddingTop : '24px',letterSpacing: '0.09em'}}>
          Welcome to our blog, your go-to destination for an extensive collection of insightful articles and tutorials. Dive into a diverse range of topics including web development, software engineering, programming languages, and much more. Whether you're a seasoned developer seeking advanced techniques or a beginner eager to learn the basics, our curated content has something for everyone. Stay updated with the latest trends, best practices, and innovative solutions in the ever-evolving world of technology. Explore, learn, and enhance your skills with us!
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline' style={{ fontSize: '1.2rem',
    lineHeight: '1',paddingTop : '24px'}}
        >
          View all posts
        </Link>
      </div>
      <div className='max-w-8xl mx-auto p-3 flex flex-col gap-16 py-7' style={{gap : '4rem'}}>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-10' style={{gap : '5rem'}}>
            <h2 className='text-3xl font-semibold text-center text-gray-400 border-gray-600  font-serif italic' style={{letterSpacing: '0.07em',borderBottomWidth: '1px'}}>Recent Posts</h2>
            <div className='flex flex-wrap justify-evenly' style={{gap : '3rem' }}>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
          to='/search'
          className='text-center text-xs sm:text-sm text-teal-500 font-bold hover:underline' style={{ fontSize: '1.2rem',
    lineHeight: '1',padding : '24px'}}
        >
          View all posts
        </Link>
          </div>
        )}
      </div>
    </div>
  );
}