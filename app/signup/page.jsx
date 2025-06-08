"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "../components/Form";
import Header from "../components/Header";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const Signup = () => {
  const router = useRouter();
    const pathname = usePathname();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        router.push("/dashboard");
        localStorage.setItem('user', userData.username)
      } else {
        alert(
          "Signup Failed: username or email already exist, please log in"
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Form
            handleClick={handleClick}
            handleChange={handleChange}
            name={userData.username}
            email={userData.email}
            password={userData.password}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Signup;
