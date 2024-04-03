import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import FundingApp from './DonateApp';
import CampaignApprovalApp from './Verifier';
import Profile from './profile';
import OrganizationPage from './Organisation';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/donate" element={<FundingApp />} />
      <Route path="/verifier" element={<CampaignApprovalApp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/org" element={<OrganizationPage />} />
    
    </Routes>
  );
};

export default AppRoutes;
