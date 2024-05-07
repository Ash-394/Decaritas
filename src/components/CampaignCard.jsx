import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import GetDonateContract from './GetDonateContract';


function CampaignCard({ campaign }) {
  const [contract, setContract] = useState(null);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [image, setImage] = useState([]);
  const [index, setIndex] = useState(0);

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

  useEffect(() => {
    const fetchIndex = async () => {
      try {
        if (contract) {
          const i = await contract.getCampaignIndex(campaign.owner, campaign.uniqueId);
          const ind = ethers.formatEther(i) * Math.pow(10, 18);;
          setIndex(ind);
        }
      } catch (error) {
        console.error('Error fetching index:', error);
      }
    };

    fetchIndex();
  }, [contract, campaign.owner, campaign.uniqueId]);

  const formatTimestamp = (timestamp) => {
    const milliseconds = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const dateObject = new Date(milliseconds);

    // Use Date methods to get the individual components of the date
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Month starts from 0, so add 1
    const date = dateObject.getDate();
    //const hours = dateObject.getHours();
    //const minutes = dateObject.getMinutes();
    //const seconds = dateObject.getSeconds();
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;
    return formattedDate;
  };


  return (
    <div className="card">

      {title[index - 1] !== undefined && <h3 className="text-lg font-semibold font-sans">{title[index - 1]}</h3>}
      {description[index - 1] !== undefined &&
        <p className="text-sm text-black mb-2 font-sans"> {description[index - 1]}</p>}
      {campaign[0] !== undefined && <p className="text-sm text-black mb-2 font-sans">{campaign[0]}</p>}
      {image[index - 1] !== undefined && <img src={image[index - 1]} alt="Campaign" className="max-w-auto h-[200px] mb-4" />}
      {campaign.amountCollected !== undefined && <p className="text-sm text-black mb-2 font-sans">Amount collected : {'$' + (ethers.formatUnits(campaign.amountCollected.toString()))} </p>}

      {campaign.target !== undefined && <p className="text-sm text-black mb-2 font-sans">Target : {'$' + (ethers.formatUnits(campaign.target.toString()))} </p>
      }

      {campaign.verifierFee !== undefined && <p className="text-sm text-black mb-2 font-sans">verifierFee : {'$' + (ethers.formatUnits(campaign.verifierFee.toString()))} </p>}
      {campaign.totalFundsRequired !== undefined && <p className="text-sm text-black mb-2 font-sans">totalFundsRequired : {'$' + (ethers.formatUnits(campaign.totalFundsRequired.toString()))} </p>
      }
      {campaign.deadline !== undefined && <p className="text-sm text-black mb-2 font-sans">Deadline: {formatTimestamp(campaign.deadline.toString())} </p>
      }

    </div>
  );
}


export default CampaignCard;
