"use client"
import { useState } from 'react'
import Form from '../components/Form';
import Header from '../components/Header';
import { useRouter }  from 'next/navigation';
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from 'next/navigation';


const Login = () => {

  const router = useRouter();
  const pathname = usePathname();

    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });
   

const handleClick = async (e) => {
e.preventDefault();
          try {
            const response = await fetch('/api/users/login', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(userData)
            });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          localStorage.setItem('user', userData.username)
          router.push('/dashboard');
          
        } else {
          const errorData = await response.json();
          alert("Login Failed: Invalid email or password")
          console.error("Login Failed:", errorData.message || 'unknown error');
        }
      } catch(error) {
        console.error("Error during login:", error);
        
      }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
   setUserData( prev => ({...prev, [name]: value}) );
  
        
     
    }

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
      
        handleChange={handleChange}
        handleClick={handleClick}
        name={userData.username}
        password={userData.password}
      />
      </motion.div>
      </AnimatePresence>
 
    </>
  );
}

export default Login