"use client"
import {useEffect, useState} from 'react'
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';



const Header = () => {

const [token, setToken] = useState(null)

const pathname = usePathname();
const router = useRouter();

const handleClick = () => {
  localStorage.removeItem('token');
  router.push('/');

}
useEffect(() => {
  setToken(localStorage.getItem("token"));
}, []);

useEffect(() => {
  const now = performance.now();
  console.log(`Hydrated at: ${Math.round(now)}ms`);
}, []);


  return (
    <header
      style={{ backgroundImage: "url('/olya-kolosha-3.jpg')" }}
      className="grid grid-cols-1 fill-white drop-shadow-xl/50 md:grid-cols-3"
    >
      <nav className="flex justify-between p-4 md:col-span-3">
        <Link href={"/"}>
          <h1 className="hover:text-blue-300 font-stretch-extra-condensed text-shadow-lg link link-hover">
            Lindblogs
          </h1>
        </Link>
   
        {pathname === "/" && (
          <Link href={token ? "/dashboard" : "/login"} className="link link-hover self-center font-bold hover:text-blue-600">
            {token ? "Back to Dashboard" : "Login"}
          </Link>
        )}
        {pathname === "/dashboard" && (
          <button className="btn btn-ghost" onClick={handleClick}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header