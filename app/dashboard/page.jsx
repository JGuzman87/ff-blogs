"use client";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [blogData, setBlogData] = useState({ title: "", content: "" });
  const [savedBlogs, setSavedBlogs] = useState([])

  useEffect(() => {
        const fetchBlogs = async () => {
          try {
            const response = await fetch("/api/blogs");
            const data = await response.json();
            setSavedBlogs(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchBlogs();
  
  }, [])
  
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/blogs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
      if (response.ok) {
        console.log("its ok");
      } else {
        const errorData = await response.json();
        console.error(
          "Posting blog failed",
          errorData.message || "unknown error"
        );
      }
    } catch (error) {
      console.error(error);
    }

          const fetchBlogs = async () => {
            try {
              const response = await fetch("/api/blogs");
              const data = await response.json();
              setSavedBlogs(data);
            } catch (error) {
              console.log(error);
            }
          };
          fetchBlogs();



    setBlogData({ title: "", content: "" });
  };



  const handleChange = (e) => {
    setBlogData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-3 p-2 gap-8 items-start">
      <form
        className="flex flex-col p-2 justify-evenly md:justify-center max-w-full  gap-4 bg-gray-200 col-span-1 shadow-2xl rounded-md h-fit"
        onSubmit={handleClick}
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
          onChange={handleChange}
          value={blogData.title}
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
          onChange={handleChange}
          value={blogData.content}
          required
        ></textarea>
        <button type="submit" className="btn btn-secondary">
          submit
        </button>
      </form>
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
                  <button className="btn btn-soft btn-error">Delete</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
