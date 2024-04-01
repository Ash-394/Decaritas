// Import necessary libraries
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import VerifierContract from './contracts/Verifier.json'; // Assuming you have compiled and deployed the contract

// Define the component
function CampaignApprovalApp() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [pendingApprovals, setPendingApprovals] = useState([]);

  useEffect(() => {
    // Load Web3 and set up connection to blockchain
    async function loadBlockchainData() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request user permission to access accounts
        setWeb3(web3);

        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = VerifierContract.networks[networkId];
        const contract = new web3.eth.Contract(
          VerifierContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        setContract(contract);
      } else {
        console.log('Web3 not found.');
      }
    }

    loadBlockchainData();
  }, []);

  useEffect(() => {
    // Fetch pending approvals from the contract
    async function fetchPendingApprovals() {
      if (contract) {
        const pendingApprovals = await contract.methods.getPendingApprovals().call();
        setPendingApprovals(pendingApprovals);
      }
    }

    fetchPendingApprovals();
  }, [contract]);

  // Handle campaign approval
  const approveCampaign = async (index) => {
    try {
      await contract.methods.approveCampaign(index).send({ from: accounts[0] });
      // Refresh pending approvals after approval
      fetchPendingApprovals();
    } catch (error) {
      console.error('Error approving campaign:', error);
    }
  };

  // Render UI
  return (
    <div>
      <h1>Campaign Approval App</h1>
      <h2>Pending Approvals:</h2>
      <ul>
        {pendingApprovals.map((approval, index) => (
          <li key={index}>
            <div>Title: {approval.title}</div>
            <div>Description: {approval.description}</div>
            <div>Target: {approval.target}</div>
            <div>Deadline: {approval.deadline}</div>
            <div>Status: {approval.status}</div>
            <button onClick={() => approveCampaign(index)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CampaignApprovalApp;
