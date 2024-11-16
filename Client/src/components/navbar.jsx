import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      {/* Main Navbar (ye static hi rhega)*/}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600" style={{ fontFamily: "'Akaya Telivigala', static" }}>
            <Link to="/" className="flex items-center">
              <img src="/logo.png"  className="h-8 w-8 mr-2" />
              UnTaboo
            </Link>
          </div>
          {/* Links */}
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-semibold transition duration-300">
              Home
            </Link>
            <Link to="/OurDoctors" className="text-gray-600 hover:text-blue-600 font-semibold transition duration-300">
              Our Doctors
            </Link>
            <Link to="/services" className="text-gray-600 hover:text-blue-600 font-semibold transition duration-300">
            Podcast
            </Link>
            <Link to="/discussion" className="text-gray-600 hover:text-blue-600 font-semibold transition duration-300">
            Discussion
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 font-semibold transition duration-300">
              Contact
            </Link>
          </div>

          {/* Button */}
          <div>
            <Link to="/book" className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-indigo-600 transition duration-300">
              Book a Consultation
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
