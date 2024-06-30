import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null,
  onApiLoginContext: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const { mutate: loginMutation } = useLogin();

  const onApiLoginContext = async (username: string, password: string) => {
    try {
      loginMutation({ username, password }, {
        onSuccess: (data) => {
          const token = data.token;
          localStorage.setItem('token', token);
          setIsAuthenticated(true);
          navigate('/');
          setToken(token);
        },
        onError: (error) => {
          console.error('Login error:', error);
          alert('Login failed. Please try again later.');
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again later.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setToken(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, onApiLoginContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};