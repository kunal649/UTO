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

const Navbar = () => {
  return (
    <div>
      {/* Top Bar with Logo and Book Consultation Button */}
      <div className="fixed top-0 left-0 right-0 z-50 ">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo Section */}
          <div className="text-2xl font-roboto-bold uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-600">
            <Link to="/" className="flex items-center">
              Untaboo
            </Link>
          </div>

          {/* Book Consultation Button and Avatar */}
          <div className="flex items-center space-x-4">
            <Link
              to="/book"
              className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-indigo-600 transition duration-300"
            >
              Book a Consultation
            </Link>
            <ProfilePopup />
          </div>
        </div>
      </div>

      {/* Bottom-Centered Navbar with Glassmorphism */}
      <nav className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-lg rounded-2xl shadow-lg backdrop-blur-lg bg-white/30 border border-white/20">
        <div className="container mx-auto flex justify-center items-center py-3 px-5">
          {/* Links */}
          <div className="flex space-x-7">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 font-semibold transition duration-300"
            >
              <FaHome className="text-xl" />
            </Link>
            <Link
              to="/OurDoctors"
              className="text-gray-600 hover:text-blue-600 font-semibold transition duration-300"
            >
              <FaUserMd className="text-xl" />
            </Link>
            <Link
              to="/services"
              className="text-gray-600 hover:text-blue-600 font-semibold transition duration-300"
            >
              <FaPodcast className="text-xl" />
            </Link>
            <Link
              to="/discussion"
              className="text-gray-600 hover:text-blue-600 font-semibold transition duration-300"
            >
              <FaComments className="text-xl" />
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-blue-600 font-semibold transition duration-300"
            >
              <FaEnvelope className="text-xl" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
