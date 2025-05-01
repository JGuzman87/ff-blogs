import React from 'react'
import { usePathname } from "next/navigation";

const Form = ({handleChange, handleClick, name, email, password}) => {
  const pathname = usePathname();
  return (
    <form
      className="bg-gray-100 flex flex-col p-4 gap-4 md:max-w-1/2 items-center shadow-2xl"
      onSubmit={handleClick}
    >
{pathname === '/signup' && <>
<label>Name:</label>
    <input
      className="bg-white"
      name="name"
      type="text"
      onChange={handleChange}
      value={name}
      required
    />
    </>}
      <label>Email:</label>
      <input
        className="bg-white"
        name="email"
        type="email"
        onChange={handleChange}
        value={email}
        required
      />
      <label>Password:</label>
      <input
        className="bg-white"
        name="password"
        type="password"
        onChange={handleChange}
        value={password}
        required
      />
      <button className="bg-amber-600 rounded-lg w-1/2 " type="submit">
        Submit
      </button>
    </form>
  );
}

export default Form;