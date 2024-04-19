import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import GetDonateContract from './GetDonateContract';

const CampaignsByDonator = ({ userAddress }) => {
const [contract, setContract] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [donatedCampaigns, setDonatedCampaigns] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchContract = async () => {
        try {
            const contractInstance = await GetDonateContract(); 
            setContract(contractInstance); 
        } catch (error) {
            console.error('Error fetching contract:', error);
        }

    }
    fetchContract();
    
},[])
  

  useEffect(() => {
    const fetchDonatedCampaigns = async () => {
      try {
        if(contract){
            const campaignIds = await contract.getCampaignsByDonator('0x9B3f5942297F724F62DE8e2efF8C2430E159C62C');
            const campaigns = await Promise.all(campaignIds.map(async () => {
              const campaign = await contract.getCampaigns();
              return campaign;
            }));
            setDonatedCampaigns(campaigns);
        }
       
        console.log(donatedCampaigns[0])
      } catch (error) {
        console.error('Error fetching donated campaigns:', error);
      }
    };

    if (window.ethereum) {
      fetchDonatedCampaigns();
    } else {
      console.error('Ethereum provider not found.');
    }
  }, [contract]);


  return (
    <div className='flex justify-end '>
      <button className='relative inline-flex  p-0.5 mb-2 me-2 
    overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 
    group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 
    dark:focus:ring-purple-800' onClick={() => setShowModal(true)}>
        <span class="relative px-7 py-2 items-center transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
    Transaction History 
            </span></button>
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center ">
          <div className="bg-white p-8 rounded-lg z-10 w-half ">
            <h2 className="flex justify-center items-center text-2xl font-bold mb-4">Transaction History</h2>
      <table className="divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Description
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Owner
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Amount Donated
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {donatedCampaigns !== undefined && donatedCampaigns[0] !== undefined && donatedCampaigns[0].map((campaign, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{campaign.title}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{campaign.description}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{campaign.owner}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{'$' + (ethers.formatUnits(campaign.amountCollected.toString()))} </div>
            </td>
          </tr>
        ))}
      </tbody>
   </table>
   <div className='mt-3 mb-3 flex items-center justify-center'>
   <button className='text-white  bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2' onClick={() => setShowModal(false)}>Close</button>
   </div>
   </div>
    </div>
      )}
    </div>
      
  );
};


export default CampaignsByDonator;
