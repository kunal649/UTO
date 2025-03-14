import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, TrendingUp, DollarSign, CreditCard } from "lucide-react";

export default function ProfilePopup() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth(); // Get user & logout function

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="relative">
      {/* Avatar Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center"
      >
        <img
          src={
            user?.avatar ||
            "https://avatars.githubusercontent.com/u/184921474?v=4"
          }
          alt="User"
          className="w-full h-full object-cover"
        />
      </button>

      {/* Profile Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border p-4 z-50"
          >
            <div className="flex flex-col items-center p-4">
              {/* Profile Picture */}
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-300">
                <img
                  src={user?.avatar || "/user-avatar.jpg"}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Details */}
              <p className="text-lg font-semibold mt-2">
                {user?.name || "John Doe"}
              </p>
              <p className="text-sm text-gray-500">
                {user?.email || "johndoe@example.com"}
              </p>

              {/* Options */}
              <div className="mt-3 w-full space-y-2">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center w-full px-4 py-2 rounded-md hover:bg-gray-100"
                >
                  <TrendingUp className="w-5 h-5 mr-2" /> Dashboard
                </button>
                <button className="flex items-center w-full px-4 py-2 rounded-md hover:bg-gray-100">
                  <DollarSign className="w-5 h-5 mr-2" /> Subscriptions
                </button>
                <button className="flex items-center w-full px-4 py-2 rounded-md hover:bg-gray-100">
                  <CreditCard className="w-5 h-5 mr-2" /> Transactions
                </button>
              </div>

              {/* Logout */}
              <button
                className="flex items-center w-full px-4 py-2 mt-3 text-red-600 hover:bg-red-100 rounded-md"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-2" /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
