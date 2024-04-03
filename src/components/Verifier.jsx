// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VerifierContract from './verifier.json';

import GetVerifierContract from './GetVerifierContract';
// Define the component
function CampaignApprovalApp() {
  const [contract, setContract] = useState(null);
  const [pendingApprovals, setPendingApprovals] = useState([]);

  useEffect(() => {
    const fetchContract = async () => {
        try {
            const contractInstance = await GetVerifierContract(); // Get the contract instance
            setContract(contractInstance); // Set the contract instance in state
        } catch (error) {
            console.error('Error fetching contract:', error);
        }

    }
    fetchContract();
    
},[])

  useEffect(() => {
    // Fetch pending approvals from the contract
    async function fetchPendingApprovals() {
      if (contract) {
        const pendingApprovals = await contract.getPendingApprovals();
        setPendingApprovals(pendingApprovals);
      }
    }

    fetchPendingApprovals();
    console.log(pendingApprovals);
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
            <div>Target: {ethers.formatUnits(approval.target)}</div>
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
