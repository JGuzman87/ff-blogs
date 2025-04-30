"use client"
import { useState } from 'react'
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleClick = () => {
        const newUser = async () => {
            const response = await fetch('/api/users/routes.js')
        }
        
    }

    const handleChange = (e) => {
        if(e.target.name === "email") {
            setEmail(e.target.value);
        } else if(e.target.name === 'password') {
               setPassword(e.target.value);
        }
        
     
    }

  return (
    <>
      <Header />
      <h1>Login Page</h1>
      <LoginForm
        handleChange={handleChange}
        handleClick={handleClick}
        email={email}
        password={password}
      />
    </>
  );
}

export default Login