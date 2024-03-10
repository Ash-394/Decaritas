
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const DisplayCampaigns = ({ contract }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [value, setValue] = useState('0');
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

  //formating date to normal format
  const formatTimestamp = (timestamp) => {
    const milliseconds = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const dateObject = new Date(milliseconds);

    // Use Date methods to get the individual components of the date
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Month starts from 0, so add 1
    const date = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    return formattedDate;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-scroll scrollbar-none">
      {campaigns.map((campaign, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4">

          <h3 className="text-lg font-semibold">{campaign.title}</h3>
          <p className="text-sm text-gray-600 mb-2"> {campaign.description}</p>
          <p className="text-sm text-gray-500 mb-2">{campaign.owner}</p>
          <p className="text-sm text-gray-500 font-bold mb-2"> verificationNum : {campaign.verificationNum.toString()}</p>
          <img src={campaign.image} alt="Campaign" className="max-w-auto h-[200px] mb-4" />

          <p className="text-sm text-gray-500 mb-2">Amount collected : {ethers.formatUnits(campaign.amountCollected)} </p>
          <p className="text-sm text-gray-500 mb-2">Target : {ethers.formatUnits(campaign.target)} </p>
          <p className="text-sm text-gray-500 mb-2"> Deadline: {formatTimestamp(campaign.deadline.toString())} </p>

          <div className="flex items-center">
            <label className="mr-2">Amount(ETH):</label>
            <input
              className="border border-gray-300 rounded px-2 py-1 mr-2"
              value={donationValues[index]}
              onChange={(e) => handleDonationChange(index, e.target.value)}
            />
    
          </div>
          <div className='mt-3 mb-3 flex items-center justify-evenly'>
          <button className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={() => donateToCampaign(index, donationValues[index])}>DONATE</button>
              <button className='text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2' onClick={() => handleWithdraw(index)}>Withdraw</button>
            </div>
        </div>
      ))}

    </div>

  );
};

export default DisplayCampaigns;
