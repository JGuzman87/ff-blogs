"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "../components/Form";
import Header from "../components/Header";

const Signup = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    console.log(userData);
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
      } else {
        const errorData = await response.json();
        console.error("Signup Failed:", errorData.message || "unknown error");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <Header />
      <h1>Signup Page</h1>
      <Form
        handleClick={handleClick}
        handleChange={handleChange}
        name={userData.name}
        email={userData.email}
        password={userData.password}
      />
    </div>
  );
};

export default Signup;
