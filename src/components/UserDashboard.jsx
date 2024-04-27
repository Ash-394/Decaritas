import React, { useState, useEffect } from 'react';
import CampaignCard from './CampaignCard';
import ProfileCard from './ProfileCard';
import GetDonateContract from './GetDonateContract';
import { ethers } from 'ethers';
import CampaignsByDonator from './FetchCampaigns' ;
import UseWallet from './useWallet';



function UserDashboard() {
  const [contract, setContract] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [donationValues, setDonationValues] = useState({});
  const [approvedCampaigns, setApprovedCampaigns] = useState([]);
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
    
},[])


useEffect(() => {
  const fetchCampaigns = async () => {
      try {
          const allCampaigns = await contract.getCampaigns();

          setCampaigns(allCampaigns);
          const approved = allCampaigns.filter(campaign => campaign.approved);

          setApprovedCampaigns(approved);
      } catch (error) {
          console.error('Error fetching campaigns:', error);
      }
  };

  fetchCampaigns();
}, [contract, campaigns]);



const handleDonationChange = (index, value) => {
  // Update donation value for the selected campaign
  setDonationValues({
    ...donationValues,
    [index]: value,
  });
}
const donateToCampaign = async (campaignId, value) => {
  try {
    const overrides = {
      value: ethers.parseEther(value),
    };

    const _id  = campaignId + 1;

    await contract.donateToCampaign(_id, overrides);

  } catch (error) {
    alert('Donation not allowed');
    console.error('Error donating to campaign:', error);
  }
};



  return (
    <div className="container mx-auto px-4 py-8 bg-cover bg-center  w-full h-screen "  style={{ backgroundImage: "url('https://images.pexels.com/photos/4319805/pexels-photo-4319805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
      <ProfileCard
        walletAddress={accounts}
      />
      
      <div className="mt-16"><CampaignsByDonator/></div>
                
      <h2 className="text-2xl font-bold mb-4">Campaigns</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {approvedCampaigns.map((campaign, index) => (
          <li key={index} className="border p-4">
            <CampaignCard campaign={campaign} index ={index} />
            <div className="flex items-center m-2">
            <label className="mr-2">Amount(ETH):</label>
            <input
              className="border border-gray-300 rounded px-2 py-1 mr-2"
              value={donationValues[index]}
              onChange={(e) => handleDonationChange(index, e.target.value)}
            />

          </div>
          
          <div className='mt-3 mb-3 flex items-center justify-evenly'>
            <button className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={() => donateToCampaign(index, donationValues[index])}>DONATE</button>
          </div>
          </li>
        ))}
      </ul>

    </div>
  );
}



export default UserDashboard;
