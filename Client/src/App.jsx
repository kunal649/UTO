import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import OurDoctors from "./pages/OurDoctors.jsx";

import Login from "./pages/login.jsx";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/navbar.jsx";
import AppointmentPopup from "./components/AppointmentPopup.jsx";
import BlogComponent from "./pages/discussion.jsx";

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/discussion " element={<BlogComponent />} />
           
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
      </AuthProvider>
    </BrowserRouter>
  );
}
