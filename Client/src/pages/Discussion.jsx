import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Discussion = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null; // Prevent rendering the discussion content
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Welcome to the Discussion Page!</h1>
      
    </div>
  );
};

export default Discussion;
