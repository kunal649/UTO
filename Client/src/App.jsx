import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import OurDoctors from "./pages/OurDoctors.jsx";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/navbar.jsx";
import AppointmentPopup from "./components/AppointmentPopup.jsx";
import BlogComponent from "./pages/Discussion.jsx"; 
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";


export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discussion " element={<BlogComponent />} />
           <Route path="/Signup" element={<Signup/>}/>
           <Route path ="/login" element={<Login/>}/>
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
