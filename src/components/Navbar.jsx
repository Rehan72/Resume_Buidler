import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const user = {name: "John Doe"};
    const logoutUser = () => {
        // Logic to logout user
        navigate('/')
        console.log("User logged out");
    }
  return (
    <div className='shadow bg-white'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
         <Link to='/'>
         <img src="/src/assets/resume.svg" alt="Resume Logo" className='h-10 w-auto'/>
         </Link>
         <div className='flex items-center gap-4 text-sm'>
            <p className='max-sm:hidden'>Hi, {user?.name}</p>
            <button onClick={logoutUser} className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>
                Logout  
            </button>
         </div>
        </nav>
    </div>
  )
}

export default Navbar