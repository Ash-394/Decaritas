// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VerifierContract from './verifier.json'; // Assuming you have compiled and deployed the contract

// Define the component
function CampaignApprovalApp() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [pendingApprovals, setPendingApprovals] = useState([]);

  useEffect(() => {
    // Load Ethereum provider and signer
    
    async function loadBlockchainData() {
      const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log("contract");
    // Deployed contract address
    const contractAddress = "0x1d83eAb5E9Cc764ED9c25615630C72E5287522C2";

    // Instantiate the contract
    const verifyingContract = new ethers.Contract(
      contractAddress,
      VerifierContract.abi,
      signer
    );

    setContract(verifyingContract);
    }

    loadBlockchainData();
  }, []);

  useEffect(() => {
    // Fetch pending approvals from the contract
    async function fetchPendingApprovals() {
      if (contract) {
        const pendingApprovals = await contract.getPendingApprovals();
        setPendingApprovals(pendingApprovals);
      }
    }

    fetchPendingApprovals();
  }, [contract]);

  // Handle campaign approval
  const approveCampaign = async (index) => {
    try {
      await contract.approveCampaign(index);
      // Refresh pending approvals after approval
      contract.getPendingApprovals();
    } catch (error) {
      console.error('Error approving campaign:', error);
    }
  };

  // Render UI
  return (
    <div>
      <h1>Campaign Approval App</h1>
      <h2>Pending Approvals:</h2>
      <ul>
        {pendingApprovals.map((approval, index) => (
          <li key={index}>
            <div>Title: {approval.title}</div>
            <div>Description: {approval.description}</div>
            <div>Target: {approval.target}</div>
            <div>Deadline: {approval.deadline}</div>
            <div>Status: {approval.status}</div>
            <button onClick={() => approveCampaign(index)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CampaignApprovalApp;
