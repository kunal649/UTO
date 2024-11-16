// src/components/AppointmentPopup.jsx

// Dummy data for demonstration
const doctor = {
    name: 'Dr. Seema Sharma',
    specialty: 'Gynecologist',
    qualification: 'MBBS, MD - Obstetrics & Gynecology',
    experience: '10+ years',
    imageUrl: 'https://via.placeholder.com/100', // Replace with actual image URL
    consultationFee: '₹1000',
  };
  
  // Razorpay payment handler function
  const handlePayment = () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', 
      amount: 1000 * 100, // Fee in paisa (₹1000)
      currency: 'INR',
      name: 'UnTaboo',
      description: 'Consultation Fee',
      image: 'https://yourwebsite.com/logo.png', 
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      notes: {
        address: 'UnTaboo Address',
      },
      theme: {
        color: '#3399cc',
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  
  const AppointmentPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Book an Appointment</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
          </div>
          
          {/* Doctor's Info */}
          <div className="flex items-center mb-4">
            <img
              src={doctor.imageUrl}
              alt="Doctor"
              className="w-24 h-24 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="text-lg font-medium">{doctor.name}</h3>
              <p className="text-sm text-gray-600">{doctor.specialty}</p>
              <p className="text-sm text-gray-500">{doctor.qualification}</p>
              <p className="text-sm text-gray-500">{doctor.experience}</p>
            </div>
          </div>
  
          {/* Appointment Details */}
          <div className="mb-4">
            <p className="text-gray-700">Consultation Fee: <span className="font-semibold">{doctor.consultationFee}</span></p>
          </div>
  
          {/* Payment Button */}
          <div className="text-center">
            <button
              onClick={handlePayment}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default AppointmentPopup;
  