import React, { useState }from 'react';
import useWallet from './useWallet';
const Homepage = () => {
  const [showMore, setShowMore] = useState(false);
  const { connectWallet } = useWallet();
  const handleConnectWallet = async () => {
    await connectWallet();
  };

  const handleShowMore = () =>{
    setShowMore(true);
  }
  return (
    <div className="h-screen bg-gradient-to-br from-slate-700 via-slate-900 to-slate-900 flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8 font-[Poppins]">de-caritas</h1>
        <p className="text-lg font-mono text-white mb-8">
          Welcome to de-caritas, a blockchain-based donation traceability platform where you can make transparent and secure donations.
        </p>
        <div className="flex justify-center space-x-4">
        <button className="relative py-1 px-1 inline-flex items-center justify-center p-0.5 mb-2 me-1 overflow-hidden
         text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-purple-500 to-pink-500 
         group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-2 
         focus:outline-none focus:ring-purple-100 dark:focus:ring-purple-200" onClick={handleConnectWallet} >
<span class="relative px-5 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
Connect with MetaMask
</span>
</button>

          <button className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none 
          focus:ring-[#24292F]/50 font-medium rounded-full text-sm px-4 py-2 text-center inline-flex items-center 
          dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2" onClick={handleShowMore}>
            Learn More
          </button>
        </div>
      </div>
      {showMore ? (
      <div className="mt-16 flex flex-col items-center ">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 font-monojustify-center">About de-caritas</h2>
        <p className="ml-2 mr-2 text-lg font-mono text-gray-800">
          de-caritas is a platform that leverages blockchain technology to ensure transparency and traceability in the donation process. With de-caritas, donors can track their donations in real-time, ensuring that their contributions reach the intended beneficiaries efficiently and securely.
        </p>
      </div>
      ) : null}
    </div>
  );
};

export default Homepage;

