"use client"
import {  useState, useEffect } from "react";
import Header from "./components/Header";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Home() {

  const [blogs, setBlogs] = useState(null);
    const pathname = usePathname();


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

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {blogs?.map((blog) => (
            <div
              key={blog.id}
              className=" bg-white fill-white drop-shadow-xl/50 shadow-2xl max-w-full p-4 md:max-w-1/2 item-center"
            >
              <h1 className="underline">{blog.title}</h1>
              <p>{blog.content}</p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
