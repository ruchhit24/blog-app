import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    
      <div className='min-h-screen max-w-xl p-8'>
        <div className='font-semibold text-center mb-5' style={{paddingTop : '20px'}}>C R E A T E _ N E W _ P O S T</div>
        <form>
            <div className='flex items-center justify-center gap-5 ' style={{paddingTop : '50px'}}>
            <input type='text' placeholder='Title' id='title' className='p-2 rounded-lg border border-black' style={{width : '520px'}}/>
            <select className='text-black p-2 rounded-lg text-md font-semibold border border-black'>
                <option className='font-semibold p-2' value='uncategorized'>Select a Category</option>
                <option className='font-semibold p-2' value='JAVA'>JAVA</option>
                <option className='font-semibold p-2' value='Javascript'>Javascript</option>
                <option className='font-semibold p-2' value='React'>React</option>
                <option className='font-semibold p-2' value='NextJS'>NextJS</option>
            </select>
            </div>
            <div className='flex items-center justify-center' style={{paddingTop : '50px'}}>
                <input type='file' accept='image/*'/>
                <button className='p-2 m-2 bg-gradient-to-r from-cyan-500 to-cyan-800 rounded-lg font-semibold border border-black'>Upload Image</button>
            </div>
            
            <ReactQuill theme="snow"  className='text-black bg-white h-52 w-1/2 mx-auto border border-black' style={{height : '208px',marginTop : '20px'}}/>
            <div className='flex items-center justify-center' style={{marginTop : '55px'}}>
            <button className='p-2 m-2 bg-gradient-to-r from-cyan-500 to-cyan-800 rounded-lg font-semibold border border-black '>Publish</button>

            </div>
        </form>
      </div>
   
  )
}

export default CreatePost