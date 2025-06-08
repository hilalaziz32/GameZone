'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // On mount, fetch current user if possible
    axios.get('/api/me')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const signin = async (email, password) => {
    // This sends form data as required by FastAPI's OAuth2PasswordRequestForm
    const params = new URLSearchParams({ username: email, password });
    const res = await axios.post('/api/signin', params, { withCredentials: true });
    if (res.data?.access_token) {
      // Store token in cookie (handled by server, or you can use js-cookie if needed)
      setUser(await getMe());
      router.push('/dashboard');
    }
  };

  const signup = async (email, password, role) => {
    await axios.post('/api/signup', { email, password, role });
    router.push('/signin');
  };

  const signout = () => {
    document.cookie = "access_token=; Max-Age=0; path=/"; // delete cookie
    setUser(null);
    router.push('/signin');
  };

  const getMe = async () => {
    try {
      const res = await axios.get('/api/me', { withCredentials: true });
      return res.data;
    } catch {
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
