import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔹 Google OAuth Login
  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  // 🔹 Manual Username/Password Login
  const loginUser = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      localStorage.setItem("token", response.data.token); // Store JWT
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || error.message
      );
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // 🔹 Logout Function
  const logoutUser = () => {
    localStorage.removeItem("token"); // Remove JWT
    setUser(null);
  };

  // 🔹 Fetch User Data
  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return; // No token, no request

    try {
      const response = await axios.get("http://localhost:5000/auth/user", {
        headers: { Authorization: `Bearer ${token}` }, // Send JWT
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    getUser(); // Fetch user on mount
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loginUser, loginWithGoogle, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
