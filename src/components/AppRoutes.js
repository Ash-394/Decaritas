import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import FundingApp from './DonateApp';
import CampaignApprovalApp from './Verifier';
import Profile from './profile';
import OrganizationPage from './Organisation';
import Contact from './Contact';
import About from './About';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About/>} />
      <Route path="/donate" element={<FundingApp />} />
      <Route path="/verifier" element={<CampaignApprovalApp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/org" element={<OrganizationPage />} />
      <Route path="/contact" element={<Contact/>}/>

    
    </Routes>
  );
};

export default AppRoutes;
