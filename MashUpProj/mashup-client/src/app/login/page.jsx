'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

function LogIn() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/homepage'); 
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login({ 
        Username: username, 
        Password: password 
      });

      router.push('/homepage');
    } catch (err) {
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Ett fel uppstod under inloggningen. Försök igen!');
      } 
    } finally {
      setError('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 text-black">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Logga in
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="userName" className="block mb-1 font-medium text-gray-700">
              Användarnamn
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ditt användarnamn"
              required
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Lösenord
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm mt-1">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg"
          >
            Logga in
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/register"
            type="button"
            className="text-blue-600 hover:underline font-medium"
            onClick={() => router.push('/register')}
          >
            Skapa konto
          </Link>
        </div>

      </div>
    </div>

  );
}

export default LogIn;
