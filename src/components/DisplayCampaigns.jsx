
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const DisplayCampaigns = ({ contract }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [value,setValue] = useState('0');
  const [donationValues, setDonationValues] = useState({});
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const allCampaigns = await contract.getCampaigns();
        
        setCampaigns(allCampaigns);
        
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, [contract]); 
  
  // Execute useEffect whenever contract changes


  const handleDonationChange = (index, value) => {
    // Update donation value for the selected campaign
    setDonationValues({
      ...donationValues,
      [index]: value,
    });
  }
  const donateToCampaign = async (campaignId, value) => {
    try {
      //const value = ethers.parseEther('0.001'); // Example: donating 1 Ether
      const overrides = {
        value: ethers.parseEther(value),
      };
      await contract.donateToCampaign(campaignId, overrides);
      alert('Donation successful');
      // Optionally, you can fetch campaigns again after donation to update the UI
      
    } catch (error) {
      console.error('Error donating to campaign:', error);
    }
  };
  return (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-scroll scrollbar-none">
  {campaigns.map((campaign, index) => (
    <div key={index} className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">{campaign.title}</h3>
      <p className="text-sm text-gray-600 mb-2"> {campaign.description}</p>
      <img src={campaign.image} alt="Campaign" className="max-w-auto h-[200px] mb-4" />
      <div className="flex items-center">
        <label className="mr-2">Amount(ETH):</label>
       <input
              className="border border-gray-300 rounded px-2 py-1 mr-2"
              value={donationValues[index]}
              onChange={(e) => handleDonationChange(index, e.target.value)}
            />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1 rounded"
          onClick={() => donateToCampaign(index, donationValues[index])}
        >
          Donate
        </button>
      </div>
    </div>
  ))}

</div>

  );
};

export default DisplayCampaigns;
