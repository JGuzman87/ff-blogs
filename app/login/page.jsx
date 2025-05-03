"use client"
import { useState } from 'react'
import Form from '../components/Form';
import Header from '../components/Header';
import { useRouter }  from 'next/navigation';


const Login = () => {

  const router = useRouter();

    const [userData, setUserData] = useState({
        email: '',
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
          router.push('/dashboard');
          
        } else {
          const errorData = await response.json();
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
      <Header />
      <h1>Login Page</h1>
      <Form
        handleChange={handleChange}
        handleClick={handleClick}
        email={userData.email}
        password={userData.password}
      />
    </>
  );
}

export default Login