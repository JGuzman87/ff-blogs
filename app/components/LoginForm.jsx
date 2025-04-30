import React from 'react'

const LoginForm = ({handleChange, handleClick, email, password}) => {
  return (
    <form className="bg-gray-100 flex flex-col p-4 gap-4 md:max-w-1/2 items-center shadow-2xl"onSubmit={handleClick}>
      <label>Email:</label>
      <input
        className='bg-white'
        name="email"
        type="email"
        onChange={handleChange}
        value={email}
        required
      />
      <label>Password:</label>
      <input
      className='bg-white'
        name="password"
        type="password"
        onChange={handleChange}
        value={password}
        required
      />
      <button className="bg-amber-600 rounded-lg w-1/2 "type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;