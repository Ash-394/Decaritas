import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import CampaignCard from './CampaignCard';
import GetDonateContract from './GetDonateContract';
import CreateCampaign from './CreateCampaign';
import { ethers } from 'ethers';
import UseWallet from './useWallet';
import orgService from '../service/orgservice';

const OrganizationPage = () => {

    const [campaigns, setCampaigns] = useState([]);
    const [ongoingCampaigns, setOngoingCampaigns] = useState([]);
    const [closedCampaigns, setClosedCampaigns] = useState([]);
    const [contract, setContract] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [totalAmountCollected, setTotalAmountCollected] = useState(0);
    const [campaignCount, setCampaignCount] = useState(0);
    const [name, setName] = useState(null);
    const [location, setLocation] = useState(null);


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
        const handleOrg = async () => {
            try {
                const user = await orgService.getOrgByWalletAddress(accounts);
                console.log(user)
                if (user) {
                    const username = user.orgname;
                    setName(username);
                    const loc = user.location;
                    setLocation(loc);

                }

            } catch (error) {
                console.log("error fetching data");
            }
        };
        handleOrg();
    }, [accounts]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                if (accounts) {
                    const allCampaigns = await contract.getCampaignsByOwner(accounts);
                    setCampaigns(allCampaigns);
                    const amount = await contract.getTotalAmountCollected(accounts);
                    setTotalAmountCollected(amount);
                    const count = await contract.getNumberOfCampaignsByOwner(accounts);
                    setCampaignCount(count);
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


    const withdrawFunds = async (owner, uniqueId, ind) => {
        try {
            if (contract) {
                // Withdraw funds from the campaign
                const _id = await contract.getCampaignIndex(owner, uniqueId);
                if (ongoingCampaigns[ind].balance.toString() === '0') {

                    alert("balance zero")
                    return;
                }
                if (ongoingCampaigns[ind].balance < ongoingCampaigns[ind].verifierFee) {
                    console.log(ongoingCampaigns[ind].balance.toString())
                    console.log('Fund collected is very less - should be greater than verifier feee');
                    alert("insuffient balance")
                    return;
                }
                await contract.withdrawFunds(_id);
                console.log('Funds withdrawn from campaign', _id);
            } else {
                console.error('contract not available');
            }
        } catch (error) {
            console.error('Error withdrawing funds:', error);

        }
    };


    return (
        <div className="flex justify-center container bg-cover bg-center w-full" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>

            <div className="w-1/2 p-6 ">
                <div className="mt-16">
                    <ProfileCard name={name} walletAddress={accounts} location={location}
                    />
                    <div className="mt-16 text-lg font-sans">Total Amount Collected : $ {ethers.formatUnits(totalAmountCollected.toString())} <br></br> Number Of Campaigns : {campaignCount.toString()}</div>

                    <div className="mt-16"><CreateCampaign /></div>

                </div>

            </div>
            <div className="w-1/2 p-12 ">
                {ongoingCampaigns.length > 0 && (
                    <div className="ongoing-campaigns">
                        <h3 className="text-xl font-bold mb-2">Ongoing Campaigns</h3>
                        {ongoingCampaigns.map((campaign, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-4 m-2 font-sans">
                                <div> <CampaignCard campaign={campaign} ></CampaignCard> </div>
                                <h1 className='text-sm text-black mb-2 font-sans'>balance : $ {ethers.formatUnits(campaign.balance.toString())}</h1>
                                <button className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={() => withdrawFunds(campaign[0], campaign.uniqueId, index)}>Withdraw Funds</button>
                            </div>
                        ))
                        }
                    </div>
                )}
                {closedCampaigns.length > 0 && (
                    <div className="closed-campaigns mt-6">
                        <h3 className="text-xl font-bold mb-2">Closed Campaigns</h3>
                        {closedCampaigns.map((campaign, index) => (
                            <div>
                                {campaign[0] !== "0x0000000000000000000000000000000000000000" &&
                                    <div key={index} className="bg-white shadow-md rounded-lg p-4 m-2">
                                        <div> <CampaignCard campaign={campaign}></CampaignCard> </div>

                                        <div> <h1>balance : $ {ethers.formatUnits(campaign.balance.toString())}</h1>
                                            <button className='text-white text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={() => withdrawFunds(index)}>Withdraw Funds</button>
                                        </div>
                                    </div>}
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
