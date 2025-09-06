import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { login, register } from '@/api/auth.api';
import { me } from '@/api/user.api';

interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (
    email: string,
    name: string,
    password: string,
  ) => Promise<void>;
  curentUser: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const loginUser = async (email: string, password: string) => {
    const res = await login(email, password);
    setUser(res.data);
    localStorage.setItem('token', res.data.token);
  };

  const registerUser = async (
    email: string,
    name: string,
    password: string,
  ) => {
    const res = await register(email, name, password);
    setUser(res.data);
    localStorage.setItem('user', JSON.stringify(res.data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const curentUser = async () => {
    try {
      const userRes = await me();
      setUser(userRes.data);
    } catch {
      setUser(null);
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, loginUser, registerUser, logout, curentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
