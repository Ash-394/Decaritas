import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CampaignCard from './CampaignCard';
import GetDonateContract from './GetDonateContract';
import ProfileCard from './ProfileCard';


function VerifierDashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [approvedCampaigns, setApprovedCampaigns] = useState([]);
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [contract, setContract] = useState(null);
  const [numberOfCampaigns, setNumberOfCampaigns] = useState(0);
  const [balance, setBalance] = useState(0);
  const [provider, setProvider] = useState(null);

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
        const address = '0x373DC81415FcB8ded4Bd13BfC73219f6d9845Be8';
        const bal = await provider.getBalance(address);
        const etherBalance = ethers.formatEther(bal.toString());
        setBalance(etherBalance);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  fetchBalance();
}, [contract]);



  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
          const allCampaigns = await contract.getCampaigns();
          setCampaigns(allCampaigns);
          const count = await contract.numberOfCampaigns();
          const c = count.toString();
          setNumberOfCampaigns(c);
          const approved = allCampaigns.filter(campaign => campaign.approved);
          const pending = allCampaigns.filter(campaign => !campaign.approved);

          setApprovedCampaigns(approved);
          setPendingCampaigns(pending);
        }

      catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, [contract, campaigns]);

  const approveCampaign = async (index) => {
    try {
      if (contract) {
        // Call the approve function of your contract

        const _id = numberOfCampaigns - pendingCampaigns.length + index + 1;
        console.log(numberOfCampaigns)
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
        walletAddress="0x373DC81415FcB8ded4Bd13BfC73219f6d9845Be8"
        balance={balance}
      />

      <h2 className="text-2xl font-bold mb-4">Pending Approvals</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
      {pendingCampaigns.map((campaign,index) => (
        <li key={index} className="border p-4">
          <CampaignCard campaign={campaign} index ={index} />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => approveCampaign(index)}>Approve</button>
          </li>
      ))}
      </ul>
      <h2 className="text-2xl font-bold mt-8 mb-4">Approved Approvals</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {approvedCampaigns.map((campaign, index) => (
        <li key={index} className="border p-4">
          <CampaignCard campaign={campaign} index ={index} />
        </li>
      ))}
      </ul>
    </div>
  );
}

export default VerifierDashboard;
