import React, { useState , useEffect} from 'react';
import { ethers } from 'ethers';
import FormField from './form';
import GetVerifierContract from './GetVerifierContract';
import GetDonateContract from './GetDonateContract';

const CreateCampaign = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ownerAddress, setOwnerAddress] = useState('');
  const [target, setTarget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [image, setImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [contract, setContract] = useState(null);
  const [verifier, setVerifier] = useState(null);

  useEffect(() => {
    const fetchContract = async () => {
        try {
            const contractInstance = await GetDonateContract(); 
            setContract(contractInstance); 

            const verifierInstance = await GetVerifierContract(); 
            setVerifier(verifierInstance); 
        } catch (error) {
            console.error('Error fetching contract:', error);
        }

    }
    fetchContract();
    
},[])

  const createCampaign = async () => {
    try {
      const parsedTarget = ethers.parseEther(target.toString()); // Convert to wei
      const parsedDeadline = Math.floor(new Date(deadline).getTime() / 1000); // Convert deadline to UNIX timestamp

      await contract.createCampaign(
        ownerAddress,
        title,
        description,
        parsedTarget,
        parsedDeadline,
        image
      );

      console.log('Campaign requested for approval');
      // Clear form fields after successful request
      setTitle('');
      setDescription('');
      setTarget('');
      setDeadline('');
      setImage('');
      setOwnerAddress('');
      setErrorMessage('');
      setShowModal(false);
    } catch (error) {
      console.error('Error requesting campaign approval:', error.message);
      setErrorMessage(error.message);
    }
  };
  

  return (
    <div className='flex justify-center items-center'>
      <button className='relative inline-flex  p-0.5 mb-2 me-2 
    overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 
    group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 
    dark:focus:ring-purple-800' onClick={() => setShowModal(true)}>
        <span class="relative px-7 py-2 items-center transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Create Campaign
        </span></button>
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg z-10 w-full max-w-md">
            <h2 className="flex justify-center items-center text-2xl font-bold mb-4">Create New Campaign</h2>
            <FormField
              labelName="Owner Address:"
              placeholder="Enter owner address"
              inputType="text"
              value={ownerAddress}
              handleChange={(e) => setOwnerAddress(e.target.value)}
            />
            <FormField
              labelName="Title:"
              placeholder="Enter title"
              inputType="text"
              value={title}
              handleChange={(e) => setTitle(e.target.value)}
            />
            <FormField
              labelName="Description:"
              placeholder="Enter description"
              isTextArea
              value={description}
              handleChange={(e) => setDescription(e.target.value)}
            />
            <FormField
              labelName="Target (ETH):"
              placeholder="Enter target amount in ETH"
              inputType="number"
              value={target}
              handleChange={(e) => setTarget(e.target.value)}
            />
            <FormField
              labelName="Deadline:"
              placeholder="Select deadline"
              inputType="date"
              value={deadline}
              handleChange={(e) => setDeadline(e.target.value)}
            />
            <FormField
              labelName="Image URL:"
              placeholder="Enter image URL"
              inputType="text"
              value={image}
              handleChange={(e) => setImage(e.target.value)}
            />
            <div className='mt-3 mb-3 flex items-center justify-evenly'>
              <button className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={createCampaign}>Request Approval</button>
              <button className='text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2' onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>);
};

export default CreateCampaign;
