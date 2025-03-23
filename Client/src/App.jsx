import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/hero/Home.jsx";
import OurDoctors from "./pages/OurDoctors.jsx";
//import BlogComponent from "./pages/Discussion.jsx";
import Signup from "./pages/Auth/signup.jsx";
import Login from "./pages/Auth/login.jsx";
import ProfessionalNgoMap from "./pages/Map.jsx";

import { AuthProvider } from "./context/Authcontext.jsx";
import Navbar from "./components/navbar.jsx";
import AppointmentPopup from "./components/AppointmentPopup.jsx";

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <AuthProvider>
      {" "}
      <BrowserRouter>
        <div className="relative">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/OurDoctors"
              element={
                <OurDoctors openAppointmentPopup={() => setIsPopupOpen(true)} />
              }
            />
            <Route path="/Map" element={<ProfessionalNgoMap />} />
          </Routes>
          <AppointmentPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
          />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
