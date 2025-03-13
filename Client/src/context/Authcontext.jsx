import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/v1/login",
        formData,
        { withCredentials: true }
      );

      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/v1/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post(
        "http://localhost:5000/v1/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
