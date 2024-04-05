import { ethers } from 'ethers';
import VerifierContract from './verifier.json'; 


const GetVerifierContract = async () => {
    const contractAddress = "0x9cf180853648F7E32257602B8cE8C7a07326d747";
    const contractABI = VerifierContract.abi;
  
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        console.log("hereeee");
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log(contract);
        return contract;
      } else {
        throw new Error("Please connect");
      }
    } catch (error) {
      console.log("ERROR:", error);
      throw error; // Rethrow the error for handling in the calling function
    }
  };
  
  export default GetVerifierContract;