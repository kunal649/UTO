import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import OurDoctors from "./pages/OurDoctors.jsx";
import BlogComponent from "./pages/Discussion.jsx";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";

import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/navbar.jsx";
import AppointmentPopup from "./components/AppointmentPopup.jsx";
import ProfilePopup from "./components/profile.jsx";

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="relative">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discussion" element={<BlogComponent />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/OurDoctors"
              element={
                <OurDoctors openAppointmentPopup={() => setIsPopupOpen(true)} />
              }
            />
          </Routes>
          <AppointmentPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
          />
          <UserAvatar />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

function UserAvatar() {
  const { user } = useAuth();

  return (
    user && (
      <div className="fixed top-4 right-4">
        <ProfilePopup />
      </div>
    )
  );
}
