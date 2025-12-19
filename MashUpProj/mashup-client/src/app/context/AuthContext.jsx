'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

function decodeJWT(token) {
  try {
    const cleanToken = token.replace(/^"|"$/g, '');
    const payload = cleanToken.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null); 
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("Token");
      if (token) {
        try {
          const cleanToken = token.replace(/^"|"$/g, '');
          config.headers.Authorization = `Bearer ${cleanToken}`;
        } catch (error) {
          console.error("Error setting token:", error);
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const login = async (credentials) => {
    try {
      const response = await api.post("Api/Auth/login", credentials);
      const token = response.data;
            
      if (!token) {
        throw new Error('Ingen token mottagen från servern');
      }
      
      localStorage.setItem("Token", token);
      
      const userData = { token };
      setUser(userData);

      const decoded = decodeJWT(token);
      if (decoded) {
        setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
        setUsername(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]); 
      }
      
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    LogoutSetOnlineFalse(userId);
    localStorage.removeItem("Token");
    setUser(null);
    router.push('/');
  };

  useEffect(() => {
    const token = localStorage.getItem("Token"); 
    if (token) {
      try {
        const userData = { token };
        setUser(userData);
        
        const decoded = decodeJWT(token);
        if (decoded) {
          setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
          setUsername(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
        }
      } catch (error) {
        console.error("Error with token:", error);
        localStorage.removeItem("Token");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      userId,
      username,
      isAuthenticated,
      login,
      logout,
      loading,
      api, 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}