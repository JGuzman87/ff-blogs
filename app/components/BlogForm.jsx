import React from 'react'

const BlogForm = ({click, change, title, content}) => {

    
  return (
    <form
      className="flex flex-col p-2 justify-evenly md:justify-center max-w-full  gap-4 col-span-1 shadow-2xl rounded-md bg-linear-to-r from-cyan-500 to-blue-500"
      onSubmit={click}
    >
    
      <label className="p-2 font-bold" htmlFor="title">
        {" "}
        TITLE
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
      <label className="p-2 font-bold" htmlFor="content">
        CONTENT
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
      <button type="submit" className="btn ">
        submit
      </button>
    </form>
  );
}

export default BlogForm;