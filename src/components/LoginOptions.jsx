import React from 'react';
import { useNavigate } from 'react-router-dom';


const LoginOptions = () => {
  const navigate = useNavigate();
  const handleOptionClick = (option) => {

    if (option === 'verifier') {
      navigate('/verifierlogin');
    }

    if (option === 'user') {
      navigate('/login');
    }
    if (option === 'organisation') {
      navigate('/orglogin');
    }

  };

  return (
    <div className="bg-cover bg-center w-full h-screen flex items-center justify-center"  
      style={{ backgroundImage: 
      "url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
    <div className="flex justify-center mt-8 ">
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold font-sans mb-8">Choose Login Option</h1>
        <div className="flex space-x-4">
          <button
            className="bg-orange-500 hover:bg-orange-300 text-black font-sans py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleOptionClick('user')}
          >
            Login as Donor
          </button>
          <button
            className="bg-customblue-50 hover:bg-customblue-100 text-black font-sans py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleOptionClick('verifier')}
          >
            Login as Verifier
          </button>
          <button
            className="bg-customgrey-50 hover:bg-customshade-50 text-black font-sans py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleOptionClick('organisation')}
          >
            Login as Organisation
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginOptions;
