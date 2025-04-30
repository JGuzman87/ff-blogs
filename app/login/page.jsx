"use client"
import { useState } from 'react'
import Form from '../components/Form';
import Header from '../components/Header';


const Login = () => {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });
   

    const handleClick = () => {
        const newUser = async () => {
            const response = await fetch('/api/users/routes.js')
        }
        
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
   setUserData( prev => ({...prev, [name]: value}) );
   console.log(userData)
        
     
    }

  return (
    <>
      <Header />
      <h1>Login Page</h1>
      <Form
        handleChange={handleChange}
        handleClick={handleClick}
        name={userData.name}
        email={userData.email}
        password={userData.password}
      />
    </>
  );
}

export default Login