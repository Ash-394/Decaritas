import React from 'react';
import { useNavigate } from 'react-router-dom';


const LoginOptions = () => {
    const navigate = useNavigate();
  const handleOptionClick = (option) => {
    
    if (option === 'verifier'){
        navigate('/verifierlogin');
    }

    if (option === 'user'){
        navigate('/login');
    }
    if (option === 'organisation'){
        navigate('/orglogin');
    }

  };

  return (
    <div className="flex justify-center mt-8">
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8">Choose Login Option</h1>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => handleOptionClick('user')}
        >
          Login as User
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => handleOptionClick('verifier')}
        >
          Login as Verifier
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => handleOptionClick('organisation')}
        >
          Login as Organisation
        </button>
      </div>
      </div>
    </div>
  );
};

export default LoginOptions;
