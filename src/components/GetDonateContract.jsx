import { ethers } from 'ethers';
import DonateContract from "./contract.json"; 


const GetDonateContract = async () => {
    const contractAddress = "0xf8097F0FF4bC32C82Da16bF8325b10167dd5545c";
    const contractABI = DonateContract.abi;
  
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        console.log("hereeee");
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        return contract;
      } else {
        throw new Error("Please connect ");
      }
    } catch (error) {
      console.log("ERROR:", error);
      throw error; // Rethrow the error for handling in the calling function
    }
  };
  
  export default GetDonateContract;