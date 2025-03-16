import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Default state

  // Define fetchUser in the outer scope so it can be reused
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/v1/user", {
        withCredentials: true, // Ensures cookies are sent
      });

      if (response.data && response.data._id) {
        setUser(response.data); // Store user in state if exists
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  // Run fetchUser once on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  // Logout function
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

// Export useAuth hook for consuming the context
export const useAuth = () => useContext(AuthContext);
