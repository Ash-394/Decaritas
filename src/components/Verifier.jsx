// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import GetVerifierContract from './GetVerifierContract';
import CampaignCard from './CampaignCard';

function CampaignApprovalApp() {
  const [contract, setContract] = useState(null);
  const [approvals, setApprovals] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [approvedApprovals, setApprovedApprovals] = useState([]);
  useEffect(() => {
    const fetchContract = async () => {
        try {
            const contractInstance = await GetVerifierContract(); 
            setContract(contractInstance); 
        } catch (error) {
            console.error('Error fetching contract:', error);
        }

    }
    fetchContract();
    
},[])
const fetchPendingApprovals = async () => {
  if (contract) {
    const approvals = await contract.getPendingApprovals();
    setApprovals(approvals);
    const pendingApprovals = approvals.filter(approval => ethers.formatUnits(approval.status) !== '0.000000000000000001');
    setPendingApprovals(pendingApprovals);
    const approvedApprovals = approvals.filter(approval => ethers.formatUnits(approval.status) === '0.000000000000000001');
    setApprovedApprovals(approvedApprovals);
  }
};

  useEffect(() => {
    fetchPendingApprovals();
  }, [contract, approvals]);


  const approveCampaign = async (index) => {
    try {
      await contract.approveCampaign(index);
      console.log("approved")
      const approvals = await contract.getPendingApprovals();
      setApprovals(approvals);
      // Refresh pending approvals after approval
    } catch (error) {
      console.error('Error approving campaign:', error);
    }
  };

  return (
    <div>
      <h1>Campaign Approval App</h1>
      <h2>Pending Approvals:</h2>
      <ul>
      {pendingApprovals.length > 0 ? (
        pendingApprovals.map((approval, index) => (
          
          <li key={index}>
            <CampaignCard campaign={approval}/>

            <button onClick={() => approveCampaign(index)}>Approve</button>
          </li>
        ))
        ) : (
          <li>No pending approvals</li>
        )}
      </ul>

      <h2>Approved Campaigns</h2>
      <ul>
      {approvedApprovals.length > 0 ? (
        approvedApprovals.map((approval, index) => (
          
          <li key={index}>
            <CampaignCard campaign={approval}/>
          </li>
        ))
        ) : (
          <li>None approved</li>
        )}
      </ul>
    </div>
  );
}

export default CampaignApprovalApp;
