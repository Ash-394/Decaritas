import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import DonateContract from './contract.json'; 
import useWallet from './useWallet';

const useContract = () => {
  const [contract, setContract] = useState(null);
  const { signer } = useWallet();
  const initializeContract = async () => {
      const contractAddress = '0x441f96620E8E61221460b4A6C168Da8315d599E1';
      // Instantiate the contract
      const fundingContract = new ethers.Contract(contractAddress, DonateContract.abi, signer);
      setContract(fundingContract);

      console.log(contract);
  };
  useEffect(() => {
    initializeContract();
  }, [signer]);

  return { signer, contract, initializeContract };
};

export default useContract;
