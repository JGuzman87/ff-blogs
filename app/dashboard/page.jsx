"use client";
import { useState, useEffect } from "react";
import BlogForm from "../components/BlogForm";
import BlogPosts from "../components/BlogPosts";
import Header from "../components/Header";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";


const Dashboard = () => {
  const pathname = usePathname();
  const [blogData, setBlogData] = useState({ title: "", content: "" });
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [user, setUser] = useState('');
  const [token, setToken] = useState(null);

 

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    if (!storedToken) {
      router.push('/login');
    }
  },[])

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/blogs", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setSavedBlogs(data);
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    if (token) {
      fetchBlogs();
    }
   
  }, [token]);

  useEffect(() => {
  const savedUser = localStorage.getItem('user');
  

  setUser(savedUser);
 

  console.log(user)
   
 
  },[]);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/blogs/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}`

         },
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

    await fetchBlogs();

    setBlogData({ title: "", content: "" });
  };

  //function to delete blog posts
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        // Refresh blog list
        setSavedBlogs((prev) => prev.filter((blog) => blog.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const handleChange = (e) => {
    setBlogData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {" "}
          <p className="text-end  font-bold capitalize font-stretch-extra-condensed p-2">{`Welcome to your blogs page ${user.trim()}`}</p>
          <div className="min-h-screen grid grid-cols-1 md:grid-cols-3 p-2 gap-8 items-start">
            <BlogForm
              change={handleChange}
              click={handleClick}
              title={blogData.title}
              content={blogData.content}
            />

            <BlogPosts
              user
              blogData={blogData}
              savedBlogs={savedBlogs}
              handleDelete={handleDelete}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Dashboard;
