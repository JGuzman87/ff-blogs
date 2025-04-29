import React from 'react'



const Header = () => {
  return (
    <header className="grid grid-cols-1 md:grid-cols-3">
      <nav className="flex justify-between p-2 md:col-span-3">
        <h1 className='hover:text-purple-900'>FF-Blog</h1>
        <button className="btn btn-neutral self-center">Login</button>
      </nav>
      <div className="col-span-3 p-4">
        <img
          src={"/Pacwallpaper.png"}
          alt="pac & ghost"
          className="w-full h-1/2"
        />
      </div>
    </header>
  );
}

export default Header