import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CampaignCard from './CampaignCard';

const CampaignsForUser = ({ contract }) => {
  const [campaigns, setCampaigns] = useState([]);
  //const [value, setValue] = useState('0');
  const [donationValues, setDonationValues] = useState({});
  //const [proofImages, setProofImages] = useState({}); // State to store proof images for each campaign

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        console.log("not here");
        const allCampaigns = await contract.getCampaigns();
       
        setCampaigns(allCampaigns);
        console.log(allCampaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, [contract]); // Execute useEffect whenever contract changes

 


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
      await contract.donateToCampaign(campaignId, overrides);

    } catch (error) {
      alert('Donation not allowed');
      console.error('Error donating to campaign:', error);
    }
  };

  const handleWithdraw = async (campaignId) => {
    try {
      const transaction = await contract.withdrawFunds(campaignId);
      await transaction.wait();
      console.log('Withdrawal successful');
    } catch (error) {
      alert("unauthorised access");
      console.error('Error withdrawing funds:', error);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-y-scroll mb-20" >

      {campaigns.map((campaign, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4">
          <div> <CampaignCard campaign = {campaign}></CampaignCard> </div>
          
          
          
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
        </div>
      ))}

    </div>

  );
};

export default CampaignsForUser;

/*
{window.ethereum && window.ethereum.selectedAddress === campaign.owner.toLowerCase() && (
            <div>
              <label htmlFor={`proofImage${index}`} className="block text-sm font-medium text-gray-700">
                Upload Proof
              </label>
              <input
                type="file"
                id={`proofImage${index}`}
                name={`proofImage${index}`}
                accept="image/*"
                onChange={(e) => handleProofImageUpload(index, e, campaign)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {/* Display uploaded proof image }
          {proofImages[index] && (
            <img src={proofImages[index]} alt="Proof" className="max-w-auto h-[200px] mt-4" />
          )}
*/