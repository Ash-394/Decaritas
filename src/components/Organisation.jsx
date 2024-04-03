import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';// Assuming you have a ProfileDetails component
import CampaignCard from './CampaignCard';
import GetDonateContract from './GetDonateContract';


const  OrganizationPage = () =>  {

    const [campaigns, setCampaigns] = useState([]);
    const [ongoingCampaigns, setOngoingCampaigns] = useState([]);
    const [closedCampaigns, setClosedCampaigns] = useState([]);
    const [contract, setContract] = useState(null);

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

    useEffect(() => {
        const fetchContract = async () => {
            try {
                const contractInstance = await GetDonateContract(); // Get the contract instance
                setContract(contractInstance); // Set the contract instance in state
            } catch (error) {
                console.error('Error fetching contract:', error);
            }

        }
        fetchContract();
        
    },[])

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const allCampaigns = await contract.getCampaigns();

                setCampaigns(allCampaigns);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        fetchCampaigns();
    }, [contract]);

    // Categorize campaigns as ongoing or closed
    
    useEffect(() => {
        if (!campaigns.length) return;
        const userCampaigns = campaigns.filter(campaign => campaign.owner === "0x1a89fC3068535785D8d59EE9a2e7b526134dE60F");
        const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
        const ongoing = [];
        const closed = [];

        userCampaigns.forEach(campaign => {
            if (formatTimestamp(campaign.deadline.toString()) >= now) {
                ongoing.push(campaign);
            } else {
                closed.push(campaign);
            }
        });

        setOngoingCampaigns(ongoing);
        setClosedCampaigns(closed);
        console.log("ongoing",ongoing);
        console.log("closed",closed);
        
    }, [campaigns]);


    return (
        <div className="flex justify-center overflow-y-scroll">
            
            <div className="w-1/2 p-6">
                <ProfileCard />
            </div>
            <div className="w-1/2 p-12 ">
            {ongoingCampaigns.length > 0 && (
                <div className="ongoing-campaigns">
                    <h3 className="text-xl font-bold mb-2">Ongoing Campaigns</h3>
                    {ongoingCampaigns.map((campaign, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-4">
                            <div> <CampaignCard campaign={campaign}></CampaignCard> </div>
                        </div>
                    ))
                    }
                </div>
            )}
            {closedCampaigns.length > 0 && (
                <div className="closed-campaigns mt-6">
                        <h3 className="text-xl font-bold mb-2">Closed Campaigns</h3>
                        {closedCampaigns.map((campaign, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-4">
                                <div> <CampaignCard campaign={campaign}></CampaignCard> </div>
                            </div>
                        ))
                        }
                    </div>
            )}
            </div>
        </div>
    );
}

export default OrganizationPage;
