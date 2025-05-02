"use client";
import { useState } from "react";

const Dashboard = () => {
  const [blogData, setBlogData] = useState({ title: "", content: "" });
  
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
    console.log(blogData);

    setBlogData({ title: "", content: "" });
  };

  const handleChange = (e) => {
    setBlogData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-3 p-2 gap-8">
      <form
        className="flex flex-col p-2 justify-center max-w-full  max-h-1/2 md:max-w-full  gap-4 bg-gray-200 col-span-1 shadow-2xl rounded-md"
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

      <div className="card bg-base-100 card-sm shadow-sm md:col-span-2 md:max-h-0.5">
        <div className="card-body shadow-2xl">
          <h2 className="card-title">BlogTitle</h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
