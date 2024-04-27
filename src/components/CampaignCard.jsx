import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import GetDonateContract from './GetDonateContract';


function CampaignCard({ campaign, index }) {
  const [contract, setContract] = useState(null);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [image, setImage] = useState([]);

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
    const fetchCampaignDetails = async () => {
      try {
        if (contract) {
          const numberOfCampaigns = await contract.numberOfCampaigns();
          const titlelist = [];
          const descriptionlist = [];
          const imagelist = [];
          for (let i = 1; i <= numberOfCampaigns; i++) {
            const t = await contract.title(i);
            titlelist.push(t);
            const d = await contract.description(i);
            descriptionlist.push(d);
            const im = await contract.image(i);
            imagelist.push(im);
          }
          setTitle(titlelist);
          setDescription(descriptionlist);
          setImage(imagelist);
        }
      } catch (error) {
        console.error('Error fetching campaign details:', error);
      }
    };
  
    fetchCampaignDetails();
  }, [contract]);
  
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

{title[index] !== undefined &&<h3 className="text-lg font-semibold">{title[index]}</h3> }
{description[index] !== undefined &&
      <p className="text-sm text-gray-600 mb-2"> {description[index]}</p>}
      {campaign[0] !== undefined && <p className="text-sm text-black mb-2">{campaign[0]}</p>}
      {image[index] !== undefined && <img src={image[index]} alt="Campaign" className="max-w-auto h-[200px] mb-4" />}
      {campaign.amountCollected !== undefined && <p className="text-sm text-black mb-2">Amount collected : {'$' + (ethers.formatUnits(campaign.amountCollected.toString()))} </p>}

      {campaign.target !== undefined && <p className="text-sm text-black mb-2">Target : {'$' + (ethers.formatUnits(campaign.target.toString()))} </p>
      }

      {campaign.verifierFee !== undefined && <p className="text-sm text-black mb-2">verifierFee : { '$' + (ethers.formatUnits(campaign.verifierFee.toString()))} </p>}
      {campaign.totalFundsRequired !== undefined && <p className="text-sm text-black mb-2">totalFundsRequired : {'$' + (ethers.formatUnits(campaign.totalFundsRequired.toString()))} </p>
      }
      {campaign.deadline !== undefined && <p className="text-sm text-black mb-2">Deadline: {formatTimestamp(campaign.deadline.toString())} </p>
      }
    </div>
  );
}


export default CampaignCard;
