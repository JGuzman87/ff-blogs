"use client";
import { useState, useEffect } from "react";
import BlogForm from "../components/BlogForm";

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
     <BlogForm change={handleChange} click={handleClick} title={blogData.title} content={blogData.content}/>
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
