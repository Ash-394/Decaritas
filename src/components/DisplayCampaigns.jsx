import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const DisplayCampaigns = ({ contract }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [value, setValue] = useState('0');
  const [donationValues, setDonationValues] = useState({});
  const [proofImages, setProofImages] = useState({}); // State to store proof images for each campaign

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

  const handleProofImageUpload = (campaignId, event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const proofImageUrl = reader.result;
      setProofImages(prevProofImages => ({
        ...prevProofImages,
        [campaignId]: proofImageUrl,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-y-scroll mb-20" >

      {campaigns.map((campaign, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4">

          <h3 className="text-lg font-semibold">{campaign.title}</h3>
          <p className="text-sm text-gray-600 mb-2"> {campaign.description}</p>
          <p className="text-sm text-gray-500 mb-2">{campaign.owner}</p>
          
          <img src={campaign.image} alt="Campaign" className="max-w-auto h-[200px] mb-4" />

          <p className="text-sm text-gray-500 mb-2">Amount collected : {ethers.formatUnits(campaign.amountCollected)} </p>
          <p className="text-sm text-gray-500 mb-2">Target : {ethers.formatUnits(campaign.target)} </p>
          <p className="text-sm text-gray-500 mb-2"> Deadline: {formatTimestamp(campaign.deadline.toString())} </p>

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

          {/* Display uploaded proof image */}
          {proofImages[index] && (
            <img src={proofImages[index]} alt="Proof" className="max-w-auto h-[200px] mt-4" />
          )}

          <div className="flex items-center m-2">
            <label className="mr-2">Amount(ETH):</label>
            <input
              className="border border-gray-300 rounded px-2 py-1 mr-2"
              value={donationValues[index]}
              onChange={(e) => handleDonationChange(index, e.target.value)}
            />

          </div>

          {/* Buttons for donating and withdrawing */}
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
