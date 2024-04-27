import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import CampaignCard from './CampaignCard';
import GetDonateContract from './GetDonateContract';
import CreateCampaign from './CreateCampaign';
import { ethers } from 'ethers';
import UseWallet from './useWallet';

const OrganizationPage = () => {

    const [campaigns, setCampaigns] = useState([]);
    const [ongoingCampaigns, setOngoingCampaigns] = useState([]);
    const [closedCampaigns, setClosedCampaigns] = useState([]);
    const [contract, setContract] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [totalAmountCollected, setTotalAmountCollected] = useState(0);



    useEffect(() => {
        const fetchContract = async () => {
            try {
                const contractInstance = await GetDonateContract();
                setContract(contractInstance);
                const account = await UseWallet();
                setAccounts(account);

            } catch (error) {
                console.error('Error fetching contract:', error);
            }

        }
        fetchContract();

    }, [])

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                if (accounts) {
                    const allCampaigns = await contract.getCampaignsByOwner(accounts);
                    setCampaigns(allCampaigns);
                }

            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        fetchCampaigns();
    }, [contract, campaigns, accounts]);

    // Categorize campaigns as ongoing or closed

    useEffect(() => {
        if (!campaigns.length) return;
        const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
        const ongoing = [];
        const closed = [];

        campaigns.forEach(campaign => {

            if (campaign.deadline.toString() >= now) {
                ongoing.push(campaign);
            } else {
                closed.push(campaign);
            }
        });

        setOngoingCampaigns(ongoing);
        setClosedCampaigns(closed);
    }, [campaigns]);


    const withdrawFunds = async (campaignId) => {
        try {
            if (contract) {
                // Withdraw funds from the campaign
                const _id = campaignId + 1;
                if (ongoingCampaigns[campaignId].balance.toString() === '0') {

                    alert("balance zero")
                    return;
                }
                if (ongoingCampaigns[campaignId].balance < ongoingCampaigns[campaignId].verifierFee) {
                    console.log(ongoingCampaigns[campaignId].balance.toString())
                    console.log('Fund collected is very less - should be greater than verifier feee');
                    alert("insuffient balance")
                    return;
                }
                await contract.withdrawFunds(_id);
                console.log('Funds withdrawn from campaign', _id);
            } else {
                console.error('Donate contract not available');
            }
        } catch (error) {
            console.error('Error withdrawing funds:', error);

        }
    };


    return (
        <div className="flex justify-center overflow-y-scroll bg-cover bg-center w-full h-screen" style={{ backgroundImage: "url('https://images.pexels.com/photos/4319805/pexels-photo-4319805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>

            <div className="w-1/2 p-6 ">
                <div className="mt-16">
                    <ProfileCard name='Old Paradise' walletAddress='0x1a89fC3068535785D8d59EE9a2e7b526134dE60F' location='DELHI'
                    />
                    <div className="mt-16"><CreateCampaign /></div>

                </div>

            </div>
            <div className="w-1/2 p-12 ">
                {ongoingCampaigns.length > 0 && (
                    <div className="ongoing-campaigns">
                        <h3 className="text-xl font-bold mb-2">Ongoing Campaigns</h3>
                        {ongoingCampaigns.map((campaign, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-4 m-2">
                                <div> <CampaignCard campaign={campaign} index ={index}></CampaignCard> </div>
                                <h1>balance : $ {ethers.formatUnits(campaign.balance.toString())}</h1>
                                <button className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={() => withdrawFunds(index)}>Withdraw Funds</button>
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
                                <div> <CampaignCard campaign={campaign} index ={index}></CampaignCard> </div>
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
