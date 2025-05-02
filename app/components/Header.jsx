"use client"
import React from 'react'
import Link from 'next/link';
import { usePathname } from "next/navigation";


const Header = () => {


const pathname = usePathname();


  return (
    <header className="grid grid-cols-1 md:grid-cols-3">
      <nav className="flex justify-between p-4 md:col-span-3">
        <Link href={"/"}>
          <h1 className="hover:text-purple-900">LindBlogs</h1>
        </Link>

        <Link href={"/login"} className='link link-hover self-center'>{pathname === '/' ? <p>Login</p> : <p>Signup</p>}</Link>
      </nav>
      {pathname === '/' && <div className="col-span-3">
        <img
          src={"/olya-kolosha-3.jpg"}
          alt="lindblum"
          className="w-full h-50"
        />
      </div>}
    </header>
  );
}

export default Header