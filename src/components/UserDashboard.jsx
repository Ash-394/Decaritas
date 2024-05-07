import React, { useState, useEffect } from 'react';
import CampaignCard from './CampaignCard';
import ProfileCard from './ProfileCard';
import GetDonateContract from './GetDonateContract';
import { ethers } from 'ethers';
import CampaignsByDonator from './FetchCampaigns';
import UseWallet from './useWallet';
import userService from '../service/userservice';


function UserDashboard() {
  const [contract, setContract] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [donationValues, setDonationValues] = useState({});
  const [approvedCampaigns, setApprovedCampaigns] = useState([]);
  const [accounts, setAccounts] = useState(null);
  const [name, setName] = useState(null);

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
    const fetchCampaigns = async () => {
      try {

        if (contract) {
          const allCampaigns = await contract.getCampaigns();

          setCampaigns(allCampaigns);

          const now = Math.floor(Date.now() / 1000);
          const approved = campaigns.filter(campaign => campaign.approved && campaign.deadline >= now);
          setApprovedCampaigns(approved);
        }

      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, [contract, campaigns]);

  useEffect(() => {
    const handleUser = async () => {
      try {
        const user = await userService.getUserByWalletAddress(accounts);
        if (user) {
          const username = user.email;
          setName(username);
        }

      } catch (error) {
        console.log("error fetching data");
      }
    };
    handleUser();
  }, [accounts]);


  const handleDonationChange = (index, value) => {
    // Update donation value for the selected campaign
    setDonationValues({
      ...donationValues,
      [index]: value,
    });

  }
  const donateToCampaign = async (owner, uniqueId, value) => {
    try {
      const overrides = {
        value: ethers.parseEther(value),
      };

      const _id = await contract.getCampaignIndex(owner, uniqueId);

      await contract.donateToCampaign(_id, overrides);

    } catch (error) {
      alert('Donation not allowed');
      console.error('Error donating to campaign:', error);
    }
  };

  return (
    <div className="justify-center container px-4 py-8 bg-cover bg-center  w-full  " style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <ProfileCard
        name={name}
        walletAddress={accounts}

      />

      <div className="mt-16"><CampaignsByDonator /></div>

      <h2 className="text-2xl font-bold mb-4">Campaigns</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {approvedCampaigns.map((campaign, index) => (
          <li key={index} className="bg-white shadow-md rounded-lg p-4 m-2 font-sans">
            <CampaignCard campaign={campaign} />
            <div className="flex items-center">
              <label className="mr-2">Amount(ETH):</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 mr-2"
                value={donationValues[index] || ''}
                onChange={(e) => handleDonationChange(index, e.target.value)}
              />

            </div>

            <div className='mt-3 mb-3 '>
              <button className='text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                onClick={() => donateToCampaign(campaign[0], campaign.uniqueId, donationValues[index])}>DONATE</button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}


export default UserDashboard;
