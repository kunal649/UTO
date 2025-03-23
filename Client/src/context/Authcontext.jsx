import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/v1/user", {
        withCredentials: true, 
      });

      if (response.data && response.data._id) {
        setUser(response.data); 
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logoutUser = async () => {
    try {
      await axios.post(
        "http://localhost:5000/v1/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logoutUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
