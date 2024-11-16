import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async () => {
    
    window.location.href = 'http://localhost:5000/auth/google'; 
  };

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/user', { withCredentials: true });
      setUser(response.data.user); 
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null); // Reset user if there's an error
    }
  };

  useEffect(() => {
    getUser(); // Fetch user on mount
  }, []);

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
