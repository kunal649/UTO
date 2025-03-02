import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Send signup request to the backend
      const signupResponse = await axios.post(
        "http://localhost:5000/auth/Signup",
        {
          username,
          email,
          password,
        }
      );

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {success ? (
        <div className="text-xl font-bold text-green-500 animate-fade">
          Signed up successfully! Redirecting...
        </div>
      ) : (
        <form
          onSubmit={handleSignup}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 rounded text-sm">
              {error}
            </div>
          )}

          {/* Username Field */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded w-full mb-3 focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Email Field */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full mb-3 focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Password Field */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full mb-4 focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}
