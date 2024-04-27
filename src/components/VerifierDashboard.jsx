import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CampaignCard from './CampaignCard';
import Contract from "./contract.json"; 

function VerifierDashboard({ contract }) {
  const [campaigns, setCampaigns] = useState([]);
  const [approvedCampaigns, setApprovedCampaigns] = useState([]);

  useEffect(() => {
    const loadCampaigns = async () => {
      const campaignCount = await contract.numberOfCampaigns();
      const loadedCampaigns = [];
      const loadedApprovedCampaigns = [];
      for (let i = 1; i <= campaignCount; i++) {
        const campaign = await contract.campaigns(i);
        if (campaign.approved) {
          loadedApprovedCampaigns.push(campaign);
        } else {
          loadedCampaigns.push(campaign);
        }
      }
      setCampaigns(loadedCampaigns);
      setApprovedCampaigns(loadedApprovedCampaigns);
    };
    if (contract) {
      loadCampaigns();
    }
  }, [contract]);

  const approveCampaign = async (campaignId) => {
    await contract.approve(campaignId);
    // Update campaigns list after approval
    const updatedCampaigns = await Promise.all(
      campaigns.map(async (campaign) => {
        if (campaign.id === campaignId) {
          campaign.approved = true;
        }
        return campaign;
      })
    );
    const approvedCampaign = updatedCampaigns.find(
      (campaign) => campaign.id === campaignId
    );
    setCampaigns(updatedCampaigns.filter((campaign) => !campaign.approved));
    setApprovedCampaigns([...approvedCampaigns, approvedCampaign]);
  };

  return (
    <div>
      <h1>Verifier Dashboard</h1>
      <h2>Pending Approvals</h2>
      {campaigns.map((campaign) => (
        <div key={campaign.id}>
          <CampaignCard campaign={campaign} />
          {!campaign.approved && (
            <button onClick={() => approveCampaign(campaign.id)}>
              Approve
            </button>
          )}
        </div>
      ))}
      <h2>Approved Campaigns</h2>
      {approvedCampaigns.map((campaign) => (
        <div key={campaign.id}>
          <CampaignCard campaign={campaign} />
        </div>
      ))}
    </div>
  );
}

export default VerifierDashboard;
