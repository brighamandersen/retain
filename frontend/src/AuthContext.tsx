import React, { createContext, ReactNode, useState } from 'react';
import useLocalStorage from './useLocalStorage';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
  // 'isAuthenticated',
  // false
  // );

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
