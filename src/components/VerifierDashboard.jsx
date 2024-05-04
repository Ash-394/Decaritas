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
  const [provider, setProvider] = useState(null);
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
  const fetchBalance = async () => {
    try {
        const { ethereum } = window;
    
        if (ethereum) {
          
        const pro = new ethers.BrowserProvider(window.ethereum);
        setProvider(pro);
        }
          
        if (provider) {
        const address = accounts;
        if (address){
          const bal = await provider.getBalance(address);
        const etherBalance = ethers.formatEther(bal.toString());
        setBalance(etherBalance);
        }
        
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  fetchBalance();
}, [contract, accounts]);



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

  const approveCampaign = async (owner,uniqueId) => {
    try {
      if (contract) {
        // Call the approve function of your contract
        const _id  = await contract.getCampaignIndex(owner,uniqueId);
        await contract.approve(_id);

      }
    } catch (error) {
      console.error('Error approving campaign:', error);
    }
  };


  return (
    <div className="container mx-auto px-4 py-8 bg-cover bg-center w-full "  style={{ backgroundImage: "url('https://images.pexels.com/photos/4319805/pexels-photo-4319805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
      <ProfileCard
        name="Verifier"
        walletAddress={accounts}
        balance={balance}
      />

      <h2 className="text-2xl font-bold mb-4">Pending Approvals</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
      {pendingCampaigns.map((campaign,index) => (
        <li key={index} className="border p-4">
           <CampaignCard campaign={campaign} />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => approveCampaign(campaign[0], campaign.uniqueId)}>Approve</button>
      </li>
      ))}
      </ul>
      <h2 className="text-2xl font-bold mt-8 mb-4">Approved Approvals</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {approvedCampaigns.map((campaign, index) => (
        <li key={index} className="border p-4">
          <CampaignCard campaign={campaign} />
        </li>
      ))}
      </ul>
    </div>
  );
}

export default VerifierDashboard;
