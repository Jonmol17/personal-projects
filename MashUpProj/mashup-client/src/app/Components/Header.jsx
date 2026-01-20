'use client';

import Link from 'next/link'
import React from 'react'
import { useAuth } from '../context/AuthContext';

function Header() {

  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="flex justify-between p-4 items-center shadow-md bg-gray-200">
      <Link href="/" className='text-2xl font-semibold text-black font-mono'>PictureTheWeather</Link>

      <div className=''>
        { isAuthenticated && (
          <Link href="/favorites" className='ml-4 bg-black text-white p-3 rounded-md hover:bg-gray-800 cursor-pointer'>Favoriter</Link>
        )}

        { !isAuthenticated ?
          <Link href="/login" className='ml-4 bg-black text-white p-2 rounded-md hover:bg-gray-800 cursor-pointer'>Logga in</Link>
          : 
          <button onClick={logout} className='ml-4 bg-black text-white p-2 rounded-md hover:bg-gray-800 cursor-pointer'>Logga ut</button>
        }
      </div>
    </header>

  )
}

export default Header
