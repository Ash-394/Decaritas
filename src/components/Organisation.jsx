import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import CampaignCard from './CampaignCard';
import GetDonateContract from './GetDonateContract';
import CreateCampaign from './CreateCampaign';
import GetVerifierContract from './GetVerifierContract';
import {ethers} from 'ethers';

const  OrganizationPage = () =>  {

    const [campaigns, setCampaigns] = useState([]);
    const [ongoingCampaigns, setOngoingCampaigns] = useState([]);
    const [closedCampaigns, setClosedCampaigns] = useState([]);
    const [contract, setContract] = useState(null);
    const [verifier, setVerifier] = useState(null);

    useEffect(() => {
        const fetchContract = async () => {
            try {
                const contractInstance = await GetDonateContract(); 
                setContract(contractInstance); 
                const verifierInstance = await GetVerifierContract(); 
                setVerifier(verifierInstance); 
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
    }, [contract, campaigns]);

    // Categorize campaigns as ongoing or closed
    
    useEffect(() => {
        if (!campaigns.length) return;
        const userCampaigns = campaigns.filter(campaign => campaign.owner === "0x1a89fC3068535785D8d59EE9a2e7b526134dE60F");
        const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
        const ongoing = [];
        const closed = [];

        userCampaigns.forEach(campaign => {
            
            if (campaign.deadline.toString() >= now) {
                ongoing.push(campaign);
            } else {
                closed.push(campaign);
            }
        });

        setOngoingCampaigns(ongoing);
        setClosedCampaigns(closed);
    }, [campaigns]);

    useEffect(() => {
        const listenToEvents = async () => {
            try {
                if (verifier) {
                    verifier.on('CampaignApproved', (index, approval) => {
                        console.log('Campaign approved:', approval.title);
                        // Execute frontend logic when a campaign is approved
                        // For example, display a notification
                    });
                }
            } catch (error) {
                console.error('Error listening to events:', error);
            }
        };

        listenToEvents();

        // Cleanup listener
        return () => {
            if (verifier) {
                verifier.removeAllListeners('CampaignApproved');
            }
        };
    }, [verifier]);

    useEffect(() => {
        const listenToEvents = async () => {
            try {
                if (contract) {
                    contract.on('CampaignCreated', (owner, title, description, target, verifierFee, totalFundsRequired, deadline, image) => {
                        console.log('Campaign created:', title);
                        // Execute frontend logic when a campaign is created
                        // For example, update the campaigns list displayed in UI
                    });
                }
            } catch (error) {
                console.error('Error listening to events:', error);
            }
        };

        listenToEvents();

        // Cleanup listener
        return () => {
            if (contract) {
                contract.removeAllListeners('CampaignCreated');
            }
        };
    }, [contract]);

   
      const withdrawFunds = async (campaignId) => {
        try {
          if (contract) {
            // Withdraw funds from the campaign
            if (ongoingCampaigns[campaignId].balance < ongoingCampaigns[campaignId].verifierFee ){
                console.log('Fund collected is very less - should be greater than verifier feee');
            }
            await contract.withdrawFunds(campaignId);
            console.log('Funds withdrawn from campaign', campaignId);
          } else {
            console.error('Donate contract not available');
          }
        } catch (error) {
          console.error('Error withdrawing funds:', error);
          alert("balance zero !!");
        }
      };


    return (
        <div className="flex justify-center overflow-y-scroll bg-cover bg-center w-full h-screen"  style={{ backgroundImage: "url('https://images.pexels.com/photos/4319805/pexels-photo-4319805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
            
            <div className="w-1/2 p-6 ">
                <div className="mt-16">
                <ProfileCard name='Old Paradise' walletAddress='0x1a89fC3068535785D8d59EE9a2e7b526134dE60F' location='DELHI' />
                <div className="mt-16"><CreateCampaign/></div>
                
                </div>
                
            </div>
            <div className="w-1/2 p-12 ">
            {ongoingCampaigns.length > 0 && (
                <div className="ongoing-campaigns">
                    <h3 className="text-xl font-bold mb-2">Ongoing Campaigns</h3>
                    {ongoingCampaigns.map((campaign, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-4 m-2">
                            <div> <CampaignCard campaign={campaign}></CampaignCard> </div>
                            <h1>balance : $ {ethers.formatUnits(campaign.balance.toString())}</h1>
                            <button className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'  onClick={() => withdrawFunds(index)}>Withdraw Funds</button>
                        </div>
                    ))
                    }
                </div>
            )}
            {closedCampaigns.length > 0 && (
                <div className="closed-campaigns mt-6">
                        <h3 className="text-xl font-bold mb-2">Closed Campaigns</h3>
                        {closedCampaigns.map((campaign, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-4 m-2">
                                <div> <CampaignCard campaign={campaign}></CampaignCard> </div>
                                <h1>balance : $ {ethers.formatUnits(campaign.balance.toString())}</h1>
                            <button className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={() => withdrawFunds(index)}>Withdraw Funds</button>
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
