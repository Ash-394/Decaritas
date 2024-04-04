import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import FundingApp from './DonateApp';
import Profile from './profile';
import OrganizationPage from './Organisation';
import Contact from './Contact';
import About from './About';
import UserDashboard from './UserDashboard';
import VerifierDashboard from './VerifierDashboard';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About/>} />
      <Route path="/donate" element={<FundingApp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/org" element={<OrganizationPage />} />
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/verifier" element={<VerifierDashboard />} />

    
    </Routes>
  );
};

export default AppRoutes;
