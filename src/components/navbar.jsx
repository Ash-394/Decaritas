import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import useWallet from './useWallet';
import FundingApp from './DonateApp';
import CampaignApprovalApp from './Verifier';

const Nav = () => {
  let Links = [
    { name: "HOME", link: "/" },
    { name: "DONATE", link: "/donate" },

  ];
  let [open, setOpen] = useState(false);


  const { connectWallet } = useWallet();
  const handleConnectWallet = async () => {
    await connectWallet();
  };

  return (


    <div className='shadow-md h-[80px] w-full fixed top-0 left-0 bg-slate-900'>
      <div className='md:flex items-center justify-between bg-slate-900 py-4 md:px-10 px-7'>

        <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-white'>

          <span className='text-3xl text-indigo-600 mr-1 pt-2 '>
            <ion-icon name="logo-ionic"></ion-icon>
          </span>
          de-caritas
        </div>

        <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
          <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-slate-900 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
          {
            Links.map((link) => (
              <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                <a href={link.link} className='text-white font-mono hover:text-gray-400 duration-500'>{link.name}</a>
              </li>
            ))
          }

        </ul>

        <button className="text-white hover:text-gray-400 duration-500 font-mono" onClick={handleConnectWallet}>Connect wallet</button>
      </div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/donate" exact element={<FundingApp />} />
          <Route path="/verifier" exact element={<CampaignApprovalApp />} />
          

        </Routes>
      </Router>
    </div>

  )
}

export default Nav