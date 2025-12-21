import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString(),
        isActive: true
      };
      
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      setCurrentUser(newUser);
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: 'Ошибка при регистрации' };
    }
  };

  const login = async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => 
        u.email === email && u.password === password
      );
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        return { success: true, user };
      }
      
      return { success: false, error: 'Неверный email или пароль' };
    } catch (error) {
      return { success: false, error: 'Ошибка при входе' };
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const updateProfile = (updatedData) => {
    if (!currentUser) return { success: false };
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => 
      u.id === currentUser.id ? { ...u, ...updatedData } : u
    );
    
    const updatedUser = { ...currentUser, ...updatedData };
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    
    return { success: true, user: updatedUser };
  };

  const value = {
    currentUser,
    isLoading,
    register,
    login,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};