"use client";
import { useState, useEffect } from "react";
import BlogForm from "../components/BlogForm";
import BlogPosts from "../components/BlogPosts";

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
     <BlogPosts blogData={blogData} savedBlogs={savedBlogs} />
    </div>
  );
};

export default Dashboard;
