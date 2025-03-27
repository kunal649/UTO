import { useState } from "react";
import { motion } from "framer-motion";

export default function OurDoctors({ openAppointmentPopup }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [filter, setFilter] = useState("all");

  const doctors = [
    {
      id: 1,
      name: "Dr. Seema Sharma",
      image:
        "https://www.apollocradle.com/backend/web/doctor-images/1698306869Photo-Dr-Seema-Sharma.jpg",
      address: "Apollo Hospital Rajouri Garden New Delhi",
      qualification: "MD, Obstetrics and Gynecology F.MAS,FRCOG(UK)",
      rating: 4.8,
      specialty: "Gynecology",
      experience: "15+ years",
      languages: ["English", "Hindi"],
      availability: ["Mon-Fri: 9AM-5PM", "Sat: 10AM-2PM"],
      consultationFee: "₹1,500",
      about:
        "Dr. Seema Sharma is a renowned gynecologist with over 15 years of experience in women's health. She specializes in high-risk pregnancies and minimally invasive surgeries.",
    },
    {
      id: 2,
      name: "Dr. Parul Katiyar",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9T2cycm-LxvHkF1dyxB5kyF-3GOyxMa-1sQ&s",
      address: "ART Fertility Clinic, E-14 Defence Colony New Delhi",
      qualification: "MD, Obstetrics and Gynecology JN Medical College Aligarh",
      rating: 4.5,
      specialty: "Fertility Specialist",
      experience: "12+ years",
      languages: ["English", "Hindi", "Urdu"],
      availability: ["Tue-Sat: 10AM-6PM"],
      consultationFee: "₹2,000",
      about:
        "Dr. Parul Katiyar is a fertility specialist with expertise in IVF treatments and reproductive health. She has helped hundreds of couples achieve their dream of parenthood.",
    },
    {
      id: 3,
      name: "Dr. Vaishali Sharma",
      image:
        "https://www.drvaishalisharma.com/wp-content/uploads/2023/08/vaishali-img.jpg",
      address: "S-345, Panchsheel Park New Delhi",
      qualification: "MD, Obstetrics and Gynecology AIIMS Delhi",
      rating: 4.9,
      specialty: "Obstetrics",
      experience: "18+ years",
      languages: ["English", "Hindi", "Bengali"],
      availability: ["Mon-Sat: 9AM-7PM"],
      consultationFee: "₹2,500",
      about:
        "Dr. Vaishali Sharma is an AIIMS graduate with extensive experience in obstetrics and gynecology. She is known for her patient-centered approach and expertise in complex deliveries.",
    },
  ];

  const filteredDoctors =
    filter === "all"
      ? doctors
      : doctors.filter(
          (doctor) => doctor.specialty.toLowerCase() === filter.toLowerCase()
        );

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(selectedDoctor?.id === doctor.id ? null : doctor);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const doctorCardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <div className="w-full flex flex-col items-center py-12 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-indigo-900 mb-4">
          Our Expert Doctors
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Meet our team of specialized gynecologists dedicated to providing
          exceptional care for women's health
        </p>
      </motion.div>

      {/* Filter buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {["all", "Gynecology", "Fertility Specialist", "Obstetrics"].map(
          (specialty) => (
            <button
              key={specialty}
              onClick={() => setFilter(specialty)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === specialty
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "bg-white text-indigo-600 hover:bg-indigo-100"
              }`}
            >
              {specialty === "all" ? "All Specialists" : specialty}
            </button>
          )
        )}
      </motion.div>

      {/* Search stats */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-gray-500 mb-8"
      >
        Showing {filteredDoctors.length} doctors
      </motion.p>

      {/* Doctors list */}
      <motion.div
        className="w-full max-w-6xl px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredDoctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            variants={doctorCardVariants}
            whileHover="hover"
            className="mb-10"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="flex flex-col lg:flex-row">
                {/* Doctor image and quick info */}
                <div className="lg:w-1/3 relative overflow-hidden">
                  <div
                    className="h-full bg-cover bg-center p-6 flex flex-col justify-end"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(79, 70, 229, 0.1), rgba(79, 70, 229, 0.7)), url(${doctor.image})`,
                      minHeight: "300px",
                    }}
                  >
                    <div className="text-white">
                      <h3 className="text-3xl font-bold mb-1">{doctor.name}</h3>
                      <p className="text-indigo-100 font-medium">
                        {doctor.specialty}
                      </p>
                      <div className="flex items-center mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(doctor.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-white font-medium">
                          {doctor.rating}/5
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {doctor.languages.map((lang) => (
                          <span
                            key={lang}
                            className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Doctor details */}
                <div className="lg:w-2/3 p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex items-center mb-4">
                        <svg
                          className="w-5 h-5 text-indigo-600 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <p className="text-gray-700">{doctor.address}</p>
                      </div>
                      <div className="flex items-center mb-4">
                        <svg
                          className="w-5 h-5 text-indigo-600 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        <p className="text-gray-700">{doctor.qualification}</p>
                      </div>
                      <div className="flex items-center mb-4">
                        <svg
                          className="w-5 h-5 text-indigo-600 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-gray-700">
                          {doctor.experience} experience
                        </p>
                      </div>
                      <div className="flex items-center mb-4">
                        <svg
                          className="w-5 h-5 text-indigo-600 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-gray-700">
                          Consultation Fee: {doctor.consultationFee}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-indigo-900 mb-2">
                          Availability
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {doctor.availability.map((slot, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                            >
                              {slot}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openAppointmentPopup(doctor)}
                          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition duration-300 flex items-center justify-center"
                        >
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Book Appointment
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDoctorClick(doctor)}
                          className="flex-1 border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition duration-300 flex items-center justify-center"
                        >
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          View Profile
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expandable section */}
              {selectedDoctor?.id === doctor.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200 p-6"
                >
                  <h4 className="text-xl font-semibold text-indigo-900 mb-3">
                    About Dr. {doctor.name.split(" ")[1]}
                  </h4>
                  <p className="text-gray-700 mb-4">{doctor.about}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h5 className="font-medium text-indigo-800 mb-2">
                        Patient Reviews
                      </h5>
                      <div className="flex items-center">
                        <div className="text-3xl font-bold text-indigo-900">
                          {doctor.rating}
                        </div>
                        <div className="ml-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(doctor.rating)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">
                            Based on 120+ reviews
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h5 className="font-medium text-indigo-800 mb-2">
                        Specializations
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {["Women's Health", "Prenatal Care", "Fertility"].map(
                          (spec) => (
                            <span
                              key={spec}
                              className="px-2 py-1 bg-white text-indigo-700 rounded-full text-xs"
                            >
                              {spec}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h5 className="font-medium text-indigo-800 mb-2">
                        Contact
                      </h5>
                      <p className="text-sm text-gray-700">
                        Email: dr.{doctor.name.split(" ")[1].toLowerCase()}
                        @example.com
                      </p>
                      <p className="text-sm text-gray-700">
                        Phone: +91 98765 43210
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-12 text-center"
      >
        <h3 className="text-2xl font-bold text-indigo-900 mb-4">
          Can't find what you're looking for?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our team of specialists covers all aspects of women's health. Contact
          us for personalized recommendations.
        </p>
        <button className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-indigo-50 transition duration-300">
          Contact Support
        </button>
      </motion.div>
    </div>
  );
}
