'use client';

import Link from 'next/link'
import React from 'react'
import { useAuth } from '../context/AuthContext';

function Header() {

  const { isAuthenticated } = useAuth();

  return (
    <header className="flex justify-between p-4 items-center shadow-sm bg-blue-100">
      <Link href="/" className='text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900'>PictureTheWeather</Link>

      { !isAuthenticated ?
        <Link href="/login" className='ml-4 bg-black text-white p-2 rounded-md hover:bg-gray-800'>Logga in</Link>
        : 
        <button className='ml-4 bg-red-200 text-white p-2 rounded-md hover:bg-red-400'>Logga ut</button>
      }
    </header>
  )
}

export default Header
