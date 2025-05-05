import React from 'react'



const BlogPosts = ({savedBlogs, blogData, handleDelete}) => {

  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();



  return (
    <div className="flex flex-col justify-between md:col-start-2 md:col-end-4 gap-4">
      {blogData &&
        savedBlogs.map((blog) => (
          <div
            key={blog.id}
            className="card bg-base-100 card-sm shadow-sm md:col-start-2 md:col-end-4"
          >
            <div className="card-body shadow-2xl">
              <h2 className="card-title underline">{blog.title}</h2>
              <p>{blog.content}</p>
              <div className='flex flex-col'>
                <button className="btn btn-soft btn-error w-25 self-end" onClick={() => handleDelete(blog.id)}>Delete</button>
                <span className='font-serif text-gray-500'>{`creation: ${month}/${day}/${year}`}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default BlogPosts