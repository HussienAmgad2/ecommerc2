import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    setUser(userData); // تحديث حالة المصادقة
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = ("http://localhost:5173/login")
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); // تعيين حالة المستخدم إذا كان هناك رمز
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
