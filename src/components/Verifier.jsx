import React, { useState, useEffect } from 'react';
import CampaignCard from './CampaignCard';
import GetVerifierContract from './GetVerifierContract';

function VerifierDashboard() {
    const [pendingApprovals, setPendingApprovals] = useState([]);
    const [approvedApprovals, setApprovedApprovals] = useState([]);
    const [verifier, setVerifier] = useState(null);

    useEffect(() => {
      const fetchContract = async () => {
          try {
              const verifierInstance = await GetVerifierContract(); 
              setVerifier(verifierInstance); 
          } catch (error) {
              console.error('Error fetching contract:', error);
          }

      }
      fetchContract();
      
  },[])

    useEffect(() => {
        loadPendingApprovals();
        loadApprovedApprovals();
    }, [verifier]);

    const loadPendingApprovals = async () => {
      if (verifier){
        const pending = await verifier.getPendingApprovals();
        setPendingApprovals(pending);
      }
    };

    const loadApprovedApprovals = async () => {
      if (verifier){
        const approved = await verifier.getApprovedCampaigns();
        setApprovedApprovals(approved);
      }
    };

    const approveCampaign = async (index) => {
      if (verifier){
        await verifier.approveCampaign(index);
        // After approval, update the lists
        loadPendingApprovals();
        loadApprovedApprovals();
      }
        
    };

    return (
        <div>
            <h2>Pending Approvals</h2>
            <ul>
                {pendingApprovals.map((approval, index) => (
                    <li key={index}>
                        <CampaignCard campaign={approval}/>
                        <button onClick={() => approveCampaign(index)}>Approve</button>
                    </li>
                ))}
            </ul>

            <h2>Approved Approvals</h2>
            <ul>
                {approvedApprovals.map((approval, index) => (
                    <li key={index}>
                        <CampaignCard campaign={approval}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default VerifierDashboard;
