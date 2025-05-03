"use client"
import {  useState, useEffect } from "react";
import Header from "./components/Header";

export default function Home() {

  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        setBlogs(data);
      
      }catch (error) {
        console.log(error);
      }
    }
    fetchBlogs();
  }, [])

  return (
    <div className="flex flex-col gap-4 ">
     <Header />

    {blogs?.map((blog => 
      <div key={blog.id} className="shadow-2xl max-w-full p-4 md:max-w-1/2 item-center">
        <h1>Title: {blog.title}</h1>
        <p>{blog.content}</p>
      </div>
    ))}
    </div>
  );
}
