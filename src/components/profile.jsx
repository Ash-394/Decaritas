import React, { useState, useEffect } from 'react';
import DonateContract from "./contract.json"; // Import the ABI of your contract
import { ethers } from "ethers";
import OrganizationPage from './Organisation';
import GetDonateContract from './GetDonateContract';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [showOrg, setShowOrg] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [contract, setContract] = useState(null);
    const [accounts, setAccounts] = useState(null); 
    const navigate = useNavigate();

    // Function to connect with MetaMask and retrieve wallet address
    const connectToMetaMask = async () => {
        if (window.ethereum) {
            try {
                // Requesting access to the user's MetaMask accounts
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                // Retrieving the user's MetaMask accounts
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                // Storing the first account in the state variable
                setAccounts(accounts[0]);
                const owner = "0x1a89fC3068535785D8d59EE9a2e7b526134dE60F";
                const donor = "0x9B3f5942297F724F62DE8e2efF8C2430E159C62C";

                console.log(accounts[0] == owner.toLowerCase());
                if (accounts[0] === owner.toLowerCase()){
                    setShowOrg(true);
                }
                if (accounts[0] === donor.toLowerCase()){
                    setShowUser(true);
                }

            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            console.error('MetaMask extension not detected');
        }
    };
    useEffect(() => {
        if (showOrg) {
            navigate('/org');
        }
    }, [showOrg, navigate]);



    return (
        <div className="h-screen relative ">
            <div className="absolute inset-0 flex flex-col items-center">
                {/* Card titled "Login" */}
                <div className="card p-4 border border-gray-300 rounded-lg shadow-md">
                    <h1 className="text-xl font-semibold mb-2">Login</h1>
                    {/* Connect to MetaMask button */}
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                        onClick={connectToMetaMask}
                    >
                        Connect to MetaMask
                    </button>
                    {/* Display the wallet address if available */}
                    {accounts && <p className="mt-2">Wallet Address: {accounts}</p>}
                </div>
                {showOrg && <h1>org</h1>}
                
                {showUser && <h1>User profile</h1>}
            </div>
        </div>
    );
}

export default Profile;
