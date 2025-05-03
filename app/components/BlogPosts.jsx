import React from 'react'



const BlogPosts = ({savedBlogs, blogData, handleDelete}) => {
  return (
    <div className="flex flex-col justify-between md:col-start-2 md:col-end-4 gap-4">
      {blogData &&
        savedBlogs.map((blog) => (
          <div
            key={blog.id}
            className="card bg-base-100 card-sm shadow-sm md:col-start-2 md:col-end-4 "
          >
            <div className="card-body shadow-2xl">
              <h2 className="card-title">{blog.title}</h2>
              <p>{blog.content}</p>
              <div>
                <button className="btn btn-soft btn-error" onClick={() => handleDelete(blog.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default BlogPosts