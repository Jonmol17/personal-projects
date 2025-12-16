import Link from 'next/link'
import React from 'react'

function Header() {


  return (
    <header className="flex p-4 items-center shadow-sm">
      <h1 className='text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-900'>PictureTheWeather</h1>
      
      <div className='flex mx-auto items-center'>
        <nav>
          <Link href="/" className='text-xl font-semibold text-gray-700'>Hem</Link>
        </nav>
      </div>

      <Link href="/login" className='ml-4 bg-black text-white p-2 rounded-md hover:bg-gray-800'>Logga in</Link>
    </header>
  )
}

export default Header
