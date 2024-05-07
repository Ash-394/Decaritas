import { ethers } from 'ethers';
import DonateContract from "./contract.json"; 


const GetDonateContract = async () => {
    const contractAddress = "0x6827CC7afDd6a553AA18f6FF04f206A4595882cD";
    const contractABI = DonateContract.abi;
  
    try {
      const { ethereum } = window;
  
      if (ethereum) {
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