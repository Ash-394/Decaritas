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
    
    // Filter pending approvals based on whether they are approved or not
    const pendingApprovals = approvals.filter(approval => !contract.approvedCampaigns(approval));
    setPendingApprovals(pendingApprovals);
    
    // Filter approved approvals based on whether they are approved or not
    const approvedApprovals = approvals.filter(approval => contract.approvedCampaigns(approval));
    setApprovedApprovals(approvedApprovals);
  }
};

  useEffect(() => {
    fetchPendingApprovals();
  }, [contract, approvals]);


  const approveCampaign = async (index) => {
    try {
        if (contract) {
            await contract.approveCampaign(index);
            console.log("approved");
        } else {
            console.error('Verifier contract not available');
        }
    } catch (error) {
        console.error('Error approving campaign:', error);
    }
};

useEffect(() => {
  // Listen for the CampaignApproved event
  if (contract) {
      contract.on("CampaignApproved", (index) => {
          // Update the approved approvals array with the approved campaign
          const approvedCampaign = pendingApprovals[index];
          setApprovedApprovals(prevApprovedApprovals => [...prevApprovedApprovals, approvedCampaign]);
          
          // Remove the approved campaign from the pending approvals array
          setPendingApprovals(prevPendingApprovals => prevPendingApprovals.filter((_, i) => i !== index));
      });
      
      // Remove the event listener when component unmounts
      return () => {
          contract.removeAllListeners("CampaignApproved");
      };
  }
}, [contract, pendingApprovals]);

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
