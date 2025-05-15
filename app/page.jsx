"use client"
import {  useState, useEffect } from "react";
import Header from "./components/Header";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { resolve } from "styled-jsx/css";

export default function Home() {

  const [blogs, setBlogs] = useState(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();


  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        setBlogs(data);
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [])

  return (
    <div className="flex flex-col gap-4 ">
      <Header />

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {loading ? (
            <div className="skeleton drop-shadow-xl/50 shadow-2xl max-w-full p-4 md:max-w-1/2 item-center">
              <div className="w-full min-h-8"></div>
              <div className="w-full min-h-8"></div>
              <div className="w-full min-h-8"></div>
              <div className="w-full min-h-8"></div>
            </div>
          ) : (
            blogs?.map((blog) => (
              <div
                key={blog.id}
                className=" bg-white rounded-md fill-white drop-shadow-xl/50 shadow-2xl max-w-full p-4 md:max-w-1/2 item-center"
              >
                <h1 className="underline">{blog.title}</h1>
                <p>{blog.content}</p>
              </div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
