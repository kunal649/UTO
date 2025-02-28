import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import ProfilePopup from "./profile";
import {
  FaHome,
  FaUserMd,
  FaPodcast,
  FaComments,
  FaEnvelope,
} from "react-icons/fa";
import Signup from "./signup.jsx";
import Login from "./login.jsx";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLogInOpen, setIsLoginInOpen] = useState(false);
  const { user } = useAuth(); // Get user from AuthContext

  return (
    <div>
      {/* Top Bar with Logo and Buttons */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-8">
          {/* Logo Section */}
          <div className="text-3xl font-bold uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-600">
            <Link to="/" className="flex items-center">
              {" "}
              Untaboo{" "}
            </Link>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-6">
            {!user ? (
              <>
                <Link
                  to="/Signup"
                  className="bg-white text-black px-4 py-2 text-lg rounded-full shadow-lg hover:text-indigo-600 transition duration-300"
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-black px-4 py-2 text-lg rounded-full shadow-lg hover:text-indigo-600 transition duration-300"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/patient-dashboard"
                  className="bg-blue-600 text-white px-4 py-2 text-lg rounded-full shadow-lg hover:bg-blue-800 transition duration-300"
                >
                  Dashboard
                </Link>
                <ProfilePopup />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <nav className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-xl rounded-3xl shadow-xl backdrop-blur-lg bg-white/40 border border-white/30 py-5 px-8">
        <div className="container mx-auto flex justify-around items-center">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            <FaHome className="text-4xl" />
          </Link>
          <Link
            to="/OurDoctors"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            <FaUserMd className="text-4xl" />
          </Link>
          <Link
            to="/services"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            <FaPodcast className="text-4xl" />
          </Link>
          <Link
            to="/discussion"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            <FaComments className="text-4xl" />
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            <FaEnvelope className="text-4xl" />
          </Link>
        </div>
      </nav>

      {/* Signup Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsSignupOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <Signup />
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLogInOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsLoginInOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
