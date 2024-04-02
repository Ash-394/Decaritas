import React from 'react';
import { ethers } from 'ethers';

function CampaignCard({ campaign }) {
    const formatTimestamp = (timestamp) => {
        const milliseconds = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
        const dateObject = new Date(milliseconds);
    
        // Use Date methods to get the individual components of the date
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1; // Month starts from 0, so add 1
        const date = dateObject.getDate();
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        const seconds = dateObject.getSeconds();
        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        return formattedDate;
      };
  return (
    <div className="card">
        
        <h3 className="text-lg font-semibold">{campaign.title}</h3>
        <p className="text-sm text-gray-600 mb-2"> {campaign.description}</p>
        <p className="text-sm text-gray-500 mb-2">{campaign.owner}</p>          
        <img src={campaign.image} alt="Campaign" className="max-w-auto h-[200px] mb-4" />
        <p className="text-sm text-gray-500 mb-2">Amount collected : {ethers.formatUnits(campaign.amountCollected)} </p>
        <p className="text-sm text-gray-500 mb-2">Target : {ethers.formatUnits(campaign.target)} </p>
        <p className="text-sm text-gray-500 mb-2"> Deadline: {formatTimestamp(campaign.deadline.toString())} </p>
    </div>
  );
}


export default CampaignCard;
