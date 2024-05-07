import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CampaignCard from './CampaignCard';
import GetDonateContract from './GetDonateContract';
import ProfileCard from './ProfileCard';
import UseWallet from './useWallet';



function VerifierDashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [approvedCampaigns, setApprovedCampaigns] = useState([]);
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(0);
  const [accounts, setAccounts] = useState(null);


  useEffect(() => {
    const fetchContract = async () => {
      try {
        const contractInstance = await GetDonateContract();
        setContract(contractInstance);
        const account = await UseWallet();
        setAccounts(account);

      } catch (error) {
        console.error('Error fetching contract:', error);
      }

    }
    fetchContract();

  }, [])

  useEffect(() => {
    const fetchAmountCollected = async () => {
      try {
        if (contract) {
          const fees = await contract.verifierFeeCollected();
          const amount = ethers.formatUnits(fees);
          setBalance(amount);
        }


      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchAmountCollected();
  }, [contract]);



  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const allCampaigns = await contract.getCampaigns();
        setCampaigns(allCampaigns);
        const now = Math.floor(Date.now() / 1000);
        const approved = allCampaigns.filter(campaign => campaign.approved);
        const pending = allCampaigns.filter(campaign => !campaign.approved && campaign.deadline >= now);

        setApprovedCampaigns(approved);
        setPendingCampaigns(pending);
      }

      catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, [contract, campaigns]);

  const approveCampaign = async (owner, uniqueId) => {
    try {
      if (contract) {
        const _id = await contract.getCampaignIndex(owner, uniqueId);
        await contract.approve(_id);

      }
    } catch (error) {
      console.error('Error approving campaign:', error);
    }
  };


  return (
    <div className="container mx-auto px-4 py-8 bg-cover bg-center w-full " style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <ProfileCard
        name="Verifier"
        walletAddress={accounts}
        balance={balance}
      />

      <h2 className="text-2xl font-bold mt-12 mb-4">Pending Approvals</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pendingCampaigns.map((campaign, index) => (
          <li key={index} className="bg-white shadow-md rounded-lg p-4 m-2 font-sans">
            <CampaignCard campaign={campaign} />
            <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => approveCampaign(campaign[0], campaign.uniqueId)}>Approve</button>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mt-8 mb-4">Approved Approvals</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {approvedCampaigns.map((campaign, index) => (
          <li key={index} className="bg-white shadow-md rounded-lg p-4 m-2 font-sans">
            <CampaignCard campaign={campaign} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VerifierDashboard;
