'use client';

import { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

function Register() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { api } = useAuth()

  const router = useRouter();

  function handleregister(e) {
    e.preventDefault();

    if (!username || !password) {
      return;
    }

    try {
      api.post('/api/auth/register', {
        Username: username,
        Password: password,
      })

      router.push('/login');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <form 
        onSubmit={handleregister} 
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Skapa Konto</h2>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-600">Användarnamn</label>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-600">Lösenord</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <button 
          type="submit"
          className="bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Skapa Konto
        </button>
      </form>
    </div>

  )
}

export default Register
