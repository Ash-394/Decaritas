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
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.enable(); // Request user permission to access accounts
      setProvider(provider);

      const signer = provider.getSigner();
      setSigner(signer);

      const networkId = await provider.getNetwork().then(network => network.chainId);
      const deployedNetwork = VerifierContract.networks[networkId];
      const contract = new ethers.Contract(
        deployedNetwork.address,
        VerifierContract.abi,
        signer
      );
      setContract(contract);
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
