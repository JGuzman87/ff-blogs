"use client"
import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";


const Header = () => {

const router = useRouter();
const pathname = usePathname();

  const handleClick = () => {
    if(pathname === '/') {
       router.push("/login");
    } else if(pathname === "/login") {
      router.push('signup');
    }
   
  }
  return (
    <header className="grid grid-cols-1 md:grid-cols-3">
      <nav className="flex justify-between p-2 md:col-span-3 shadow-2xl">
        <Link href={"/"}>
          <h1 className="hover:text-purple-900">LindBlogs</h1>
        </Link>

        <button onClick={handleClick} className="btn btn-neutral self-center ">{pathname === '/' ? <p>Login</p> : <p>Signup</p>}</button>
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