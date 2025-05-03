import React from 'react'

const BlogForm = ({click, change, title, content}) => {

    
  return (
    <form
      className="flex flex-col p-2 justify-evenly md:justify-center max-w-full  gap-4 bg-gray-200 col-span-1 shadow-2xl rounded-md h-fit"
      onSubmit={click}
    >
      <p>Create Blog</p>
      <label className="p-2" htmlFor="title">
        {" "}
        Title
      </label>
      <input
        className="p-2 bg-white"
        type="text"
        name="title"
        placeholder="title"
        onChange={change}
        value={title}
        required
      />
      <label className="p-2" htmlFor="content">
        Content
      </label>
      <textarea
        className="p-2 bg-white border-blue-300"
        type="text"
        name="content"
        placeholder="type content"
        onChange={change}
        value={content}
        required
      ></textarea>
      <button type="submit" className="btn btn-secondary">
        submit
      </button>
    </form>
  );
}

export default BlogForm;