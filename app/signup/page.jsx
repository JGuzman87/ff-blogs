"use client"

import Form from '../components/Form';
import Header from '../components/Header';

const Signup = () => {

  const handleClick = async () => {
   try {
    const response = await fetch('/api')
   } catch(error) {

   }

  
  }

  return (
    <div>
        <Header />
        <h1>Signup Page</h1>
        <Form />
     
    </div>
  );
}

export default Signup;