

export default function OurDoctors({ openAppointmentPopup }) {
  return (
    <div className="w-full flex flex-col space-y-16 bg-gray-50 pb-16">
      {/* Hero Section with Background Image */}
      <div
        className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white text-center shadow-lg"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/0e/3b/12/0e3b1228f70aa2c6ce2aeff9ec1d4dbf.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <h1
          className="relative text-8xl md:text-9xl font-extrabold tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Our Doctors
        </h1>
      </div>

      {/* Doctors List */}
      <div className="max-w-6xl mx-auto space-y-14 px-6">
        {/* Doctor Card */}
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center bg-gradient-to-r from-white to-gray-100 rounded-xl p-10 shadow-xl hover:shadow-2xl transition"
          >
            {/* Doctor Image */}
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-52 h-52 rounded-full object-cover md:mr-8 mb-4 md:mb-0 border-4"
              style={{ borderColor: doctor.borderColor }}
            />

            {/* Doctor Details */}
            <div className="text-left flex-grow space-y-3">
              <h3
                className="text-4xl font-bold"
                style={{ color: doctor.textColor, fontFamily: "'Inter', sans-serif" }}
              >
                {doctor.name}
              </h3>
              <p className="text-gray-700 text-lg">
                <strong>Clinic Address:</strong> {doctor.clinic}
              </p>
              <p className="text-gray-700 text-lg">
                <strong>Qualification:</strong> {doctor.qualification}
              </p>
              <p className="text-gray-700 text-lg">
                <strong>Ratings:</strong> {doctor.rating}
              </p>
            </div>

            {/* Book Appointment Button */}
            <button
              onClick={openAppointmentPopup}
              className="bg-green-600 text-white px-8 py-3 text-lg font-semibold rounded-lg hover:bg-green-700 transition shadow-md md:ml-auto mt-6 md:mt-0"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Doctor Data
const doctors = [
  {
    name: "Dr. Seema Sharma",
    clinic: "Apollo Hospital, Rajouri Garden, New Delhi",
    qualification: "MD, Obstetrics & Gynecology | F.MAS, FRCOG(UK)",
    rating: "⭐⭐⭐⭐⭐ (4.8/5)",
    image: "https://www.apollocradle.com/backend/web/doctor-images/1698306869Photo-Dr-Seema-Sharma.jpg",
    borderColor: "#6366F1",
    textColor: "#4F46E5",
  },
  {
    name: "Dr. Parul Katiyar",
    clinic: "ART Fertility Clinic, Defence Colony, New Delhi",
    qualification: "MD, Obstetrics & Gynecology | JN Medical College",
    rating: "⭐⭐⭐⭐ (4.5/5)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9T2cycm-LxvHkF1dyxB5kyF-3GOyxMa-1sQ&s",
    borderColor: "#22C55E",
    textColor: "#15803D",
  },
  {
    name: "Dr. Vaishali Sharma",
    clinic: "S-345, Panchsheel Park, New Delhi",
    qualification: "MD, Obstetrics & Gynecology | AIIMS Delhi",
    rating: "⭐⭐⭐⭐⭐ (4.9/5)",
    image: "https://www.drvaishalisharma.com/wp-content/uploads/2023/08/vaishali-img.jpg",
    borderColor: "#9333EA",
    textColor: "#6D28D9",
  },
];
