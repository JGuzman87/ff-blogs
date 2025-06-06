"use client"
import {  useState, useEffect } from "react";
import Header from "./components/Header";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";


export default function Home() {

  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const pathname = usePathname();


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        // Make a request to the blogs API with the Authorization header
        const response = await fetch("/api/blogs", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Parse the response as JSON
        const data = await response.json();

        // Ensure the data is an array before setting state
        if (Array.isArray(data)) {
          setBlogs(data);
          setIsLoggedIn(true); // ✅ mark user as logged in
        } else {
          setIsLoggedIn(false); // 🚫 user is not logged in
          if (data.message === "Unauthorized") {
            window.location.href = "/login";
          }
          setBlogs([]);
        }

        // Simulate a delay (for UX animation purposes)
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (error) {
        // Log any errors that occur during the fetch
        console.log(error);
      }
    };

    // Call the async function to fetch blogs
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Header />

      {isLoggedIn && (
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col gap-4 p-2"
          >
            {
              blogs?.map((blog) => (
                <div
                  key={blog.id}
                  className=" bg-white rounded-md fill-white drop-shadow-xl/50 shadow-2xl max-w-full p-4 md:max-w-1/2 "
                >
                  <h1 className="underline">{blog.title}</h1>
                  <p>{blog.content}</p>
                </div>
              ))
            }
          </motion.div>
        </AnimatePresence>
      )}

      {!isLoggedIn && (
        <div className="text-center text-gray-500 p-4">
          Please log in to view blog posts.
        </div>
      )}
    </div>
  );
}
