import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [showOrg, setShowOrg] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showVerifier, setShowVerifier] = useState(false);
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
                //const donor = "0x9B3f5942297F724F62DE8e2efF8C2430E159C62C";
                const verifier = "0x373DC81415FcB8ded4Bd13BfC73219f6d9845Be8";


                if (accounts[0] === owner.toLowerCase()){
                    setShowOrg(true);
                }
                else if (accounts[0] === verifier.toLowerCase()){
                    setShowVerifier(true);
                }
                else{
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
        if (showUser){
            navigate('/user');
        }
        if (showVerifier){
            navigate('/verifier');
        }
    }, [showOrg, showUser, showVerifier, navigate]);



    return (
        <div className="h-screen relative bg-cover bg-center w-full h-screen"  style={{ backgroundImage: "url('https://images.pexels.com/photos/4321069/pexels-photo-4321069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
            
         <div className="h-screen flex justify-center items-center">
    <div className="card p-8 border border-gray-300 rounded-lg shadow-md mt-10">
        <h1 className="text-xl font-semibold mb-2 justify-center items-center">Login</h1>
            {accounts && <p className="mt-2">Wallet Address: {accounts}</p>}
            <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={connectToMetaMask}
            >
                Connect to MetaMask
            </button>

            <p className="text-sm mt-3 justify-center items-center">Not registered? <a href='/profile' style={{textDecoration: 'underline'}}>Register here</a></p>
        </div>
                {showOrg && <h1>org</h1>}
                
                {showUser && <h1>User profile</h1>}
                {showVerifier && <h1>Verifier profile</h1>}
            </div>
        </div>
    );
}

export default Profile;
