import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import GetDonateContract from './GetDonateContract';
import UseWallet from './useWallet';

const CampaignsByDonator = () => {
const [contract, setContract] = useState(null);

  const [donatedCampaigns, setDonatedCampaigns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [accounts, setAccounts] = useState(null);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [donationsList, setDonationsList] = useState([]);
  


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
  const fetchCampaignDetails = async () => {
    try {
      if (contract) {
        const numberOfCampaigns = await contract.numberOfCampaigns();
        const titlelist = [];
        const descriptionlist = [];
        for (let i = 1; i <= numberOfCampaigns; i++) {
          const t = await contract.title(i);
          titlelist.push(t);
          const d = await contract.description(i);
          descriptionlist.push(d);
          
        }
        setTitle(titlelist);
        setDescription(descriptionlist);
        
      }
    } catch (error) {
      console.error('Error fetching campaign details:', error);
    }
  };

  fetchCampaignDetails();
}, [contract]);

  useEffect(() => {
    const fetchDonatedCampaigns = async () => {
      try {
        if(contract && accounts){
            const donatedCampaign = await contract.getCampaignsByDonator(accounts);
            const numberOfCampaigns = await contract.numberOfCampaigns();
            setDonatedCampaigns(donatedCampaign);
            const donations = [];
            for (let i = 1; i <= numberOfCampaigns; i++) {
              const donationAmount = await contract.donationsByUser(accounts, i);
              const d = ethers.formatUnits(donationAmount.toString())
              if (d > 0){
                donations.push(d);
              }
              
            }
            setDonationsList(donations);
        }
      
      } catch (error) {
        console.error('Error fetching donated campaigns:', error);
      }
    };

    
    fetchDonatedCampaigns();
  }, [contract , accounts]);



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
        {donatedCampaigns.map((campaign, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{title[index]}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{description[index]}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{campaign.owner}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{'$' + donationsList[index]} </div>
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
