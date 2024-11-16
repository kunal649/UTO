export default function OurDoctors({openAppointmentPopup}) {
    return (
        <div className="w-full flex flex-col space-y-8"> {/* Reduced space-y from 8 to 4 */}
        {/* Doctor 1 */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-lg p-6" data-aos="fade-right"> {/* Reduced padding from p-6 to p-4 */}
          <img src="https://www.apollocradle.com/backend/web/doctor-images/1698306869Photo-Dr-Seema-Sharma.jpg" alt="Dr. seema sharma " className="w-48 h-48 rounded-full md:mr-6 mb-4 md:mb-0" />
          <div className="text-left">
            <h3 className="text-5xl font-semibold text-indigo-900">Dr. Seema Sharma</h3>
            <p className="mt-2"><strong>Clinic Address:</strong> Apollo Hospital Rajouri Garden New Delhi</p>
            <p className="mt-2"><strong>Qualification:</strong> MD, Obstetrics and Gynecology F.MAS,FRCOG(UK)</p>
            <p className="mt-2"><strong>Ratings:</strong> ⭐⭐⭐⭐⭐ (4.8/5)</p>
            <button
        onClick={openAppointmentPopup}
        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
      >
        Book Appointment
      </button>
          </div>
        </div>
         {/* Divider */}
    <hr className="w-full border-gray-300" />

        {/* Doctor 2 */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-lg p-6" data-aos="fade-left"> {/* Reduced padding from p-6 to p-1*/}
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9T2cycm-LxvHkF1dyxB5kyF-3GOyxMa-1sQ&s" alt="Dr. Parul Katiyar" className="w-50 h-50 rounded-full md:mr-6 mb-4 md:mb-0 " />
          <div className="text-left">
            <h3 className="text-5xl font-semibold text-indigo-900">Dr. Parul Katiyar</h3>
            <p className="mt-2"><strong>Clinic Address:</strong> ART Fertility Clinic, E-14 Defence Colony New Delhi</p>
            <p className="mt-2"><strong>Qualification:</strong> MD,Obsecrics and Gynecology JN Medical College Aligarh</p>
            <p className="mt-2"><strong>Ratings:</strong> ⭐⭐⭐⭐ (4.5/5)</p>
            <button
        onClick={openAppointmentPopup}
        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
      >
        Book Appointment
      </button>

          </div>
        </div>
         {/* Divider */}
    <hr className="w-full border-gray-300" />

        {/* Doctor 3 */}
        <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-6" data-aos="fade-right">
          <img src="https://www.drvaishalisharma.com/wp-content/uploads/2023/08/vaishali-img.jpg" alt="Dr. Vaishali Sharma" className="w-48 h-48 rounded-full md:mr-6 mb-4 md:mb-0" />
          <div className="text-left">
            <h3 className="text-5xl font-semibold text-indigo-900">Dr. Vaishali Sharma</h3>
            <p className="mt-2"><strong>Clinic Address:</strong> S-345,Panchsheel Park New Delhi</p>
            <p className="mt-2"><strong>Qualification:</strong> MD, Obstetrics and Gynecology Aiims Delhi</p>
            <p className="mt-2"><strong>Ratings:</strong> ⭐⭐⭐⭐⭐ (4.9/5)</p>
            <button
        onClick={openAppointmentPopup}
        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
      >
        Book Appointment
      </button>
          </div>
        </div>
      </div>
    )
}