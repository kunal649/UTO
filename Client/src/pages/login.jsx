import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();

  useEffect(() => {
    // Automatically redirect to Google login on component mount
    login();
  }, [login]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Redirecting to Google...</h1>
    </div>
  );
};

export default Login;
