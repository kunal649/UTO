import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import axios from "axios"; // For making API requests

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(""); // For error handling
  const navigate = useNavigate();
  const { loginUser } = useAuth(); // Use loginUser from AuthContext

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Send signup request to the backend
      const signupResponse = await axios.post("http://localhost:5000/signup", {
        username,
        email,
        password,
      });

      // Step 2: If signup is successful, log the user in
      if (signupResponse.data.success) {
        const loginResponse = await loginUser({ email, password });

        if (loginResponse.success) {
          setSuccess(true);

          // Redirect to home page after a short delay
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setError(loginResponse.message || "Login failed after signup");
        }
      } else {
        setError(signupResponse.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(
        error.response?.data?.message || "An error occurred during signup"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-4">
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20">
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl shadow-lg bg-gradient-to-r from-indigo-500 to-blue-500 opacity-20 blur-2xl"></div>

        {success ? (
          <div className="relative text-xl font-bold text-green-400 text-center animate-fade">
            Signed up successfully! Redirecting...
          </div>
        ) : (
          <form onSubmit={handleSignup} className="relative space-y-6">
            
            {/* Title */}
            <h2 className="text-3xl font-extrabold text-center text-white tracking-wide font-serif">
              Sign Up
            </h2>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/20 text-red-400 text-center rounded-lg border border-red-400/50">
                {error}
              </div>
            )}

            {/* Username Field */}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-gray-300 shadow-sm backdrop-blur-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
              required
            />

            {/* Email Field */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-gray-300 shadow-sm backdrop-blur-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
              required
            />

            {/* Password Field */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-gray-300 shadow-sm backdrop-blur-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-500/80 text-white py-3 rounded-lg hover:bg-indigo-600 transition-all shadow-md font-semibold text-lg tracking-wide relative"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
