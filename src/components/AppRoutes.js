import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Profile from './profile';
import OrganizationPage from './Organisation';
import Contact from './Contact';
import About from './About';
import UserDashboard from './UserDashboard';
import VerifierDashboard from './VerifierDashboard';
import CampaignsByDonator from './FetchCampaigns';
import Signup from './signup';
import Login from './login';
import OrgLogin from './orgLogin';
import LoginOptions from './LoginOptions';
import VerifierLogin from './ verifierlogin';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/org" element={<OrganizationPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/verifier" element={<VerifierDashboard />} />
      <Route path="/fetch" element={<CampaignsByDonator />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/orglogin" element={<OrgLogin />} />
      <Route path="/verifierlogin" element={<VerifierLogin />} />
      <Route path="/loginmain" element={<LoginOptions />} />



    </Routes>
  );
};

export default AppRoutes;
