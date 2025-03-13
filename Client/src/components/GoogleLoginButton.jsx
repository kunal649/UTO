
const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/v1/google"; 
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600 transition"
    >
      <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
