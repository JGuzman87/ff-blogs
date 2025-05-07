import React from 'react'
import { usePathname } from "next/navigation";
import Link from 'next/link';

const Form = ({handleChange, handleClick,name, email, password,}) => {
  const pathname = usePathname();
  return (
    <div className="flex justify-center p-8 ">
      <form
        className="flex flex-col p-4 gap-4 min-w-full md:min-w-1/2 items-center shadow-2xl mt-25"
        onSubmit={handleClick}
      >
        <Link href={"/"}>
          <h1 className="hover:text-blue-300 font-stretch-extra-condensed text-shadow-lg">
            Lindblogs
          </h1>
        </Link>

        <label className="font-stretch-extra-condensed text-shadow-lg text-2xl">
          Username
        </label>
        <input
          className="bg-white"
          name="username"
          type="text"
          onChange={handleChange}
          value={name}
          required
        />

        {pathname === "/signup" && (
          <>
            <label className="font-stretch-extra-condensed text-shadow-lg text-2xl">
              Email:
            </label>
            <input
              className="bg-white"
              name="email"
              type="text"
              onChange={handleChange}
              value={email}
              required
            />
          </>
        )}

        <label className="font-stretch-extra-condensed text-shadow-lg text-2xl">
          Password:
        </label>
        <input
          className="bg-white"
          name="password"
          type="password"
          onChange={handleChange}
          value={password}
          required
        />
        {pathname === "/login" && (
          <div className="flex flex-col font-bold">
            <p>not registered?</p>
            <Link href={"/signup"}>
              <p className="link link-hover text-blue-500">Sign up</p>
            </Link>
          </div>
        )}
        <button
          className="bg-cyan-500 shadow-lg shadow-cyan-500/50  w-1/2 rounded-lg hover:bg-sky-700"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;