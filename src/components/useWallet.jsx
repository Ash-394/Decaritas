import { useState } from 'react';
import { ethers } from 'ethers';
const useWallet = () => {

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        // Connect to the Ethereum network
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

      } else {
        throw new Error('MetaMask is not installed.');
      }
    } catch (error) {
      console.error('Error connecting to metamask:', error);
    }
  };

  return { connectWallet };
};

export default useWallet;
