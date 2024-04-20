import React, { useState, useEffect } from 'react';
import CampaignCard from './CampaignCard';
import GetVerifierContract from './GetVerifierContract';
import ProfileCard from './ProfileCard';
import CreateCard from './CreateCard';
function VerifierDashboard() {
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [approvedApprovals, setApprovedApprovals] = useState([]);
  const [verifier, setVerifier] = useState(null);
  const [verifierBalance, setVerifierBalance] = useState(0);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const verifierInstance = await GetVerifierContract();
        setVerifier(verifierInstance);
      } catch (error) {
        console.error('Error fetching contract:', error);
      }

    }
    fetchContract();

  }, [])

  useEffect(() => {
    loadPendingApprovals();
    loadApprovedApprovals();
  }, [verifier]);

  const loadPendingApprovals = async () => {
    if (verifier) {
      const pending = await verifier.getPendingApprovals();
      setPendingApprovals(pending);
    }
  };

  const loadApprovedApprovals = async () => {
    if (verifier) {
      const approved = await verifier.getApprovedCampaigns();
      setApprovedApprovals(approved);
    }
  };

  const approveCampaign = async (index) => {
    if (verifier) {
      await verifier.approveCampaign(index);
      // After approval, update the lists
      loadPendingApprovals();
      loadApprovedApprovals();
    }

  };

  useEffect(() => {
    const updateVerifierBalance = async () => {
      if (verifier) {
        try {
          const balance = await verifier.verifierBalance();
          setVerifierBalance(balance);
        } catch (error) {
          console.error('Error updating verifier balance:', error);
        }
      }
    };
    updateVerifierBalance();
  });

  const withdrawVerifierFunds = async () => {
    if (verifier) {
      try {
        await verifier.withdrawVerifierFunds();
        setVerifierBalance(0);
      } catch (error) {
        console.error('Error withdrawing verifier funds:', error);
      }
    }
  };


  return (
    <div className="container mx-auto px-4 py-8 bg-cover bg-center w-full "  style={{ backgroundImage: "url('https://images.pexels.com/photos/4319805/pexels-photo-4319805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
      <ProfileCard
        name="Verifier"
        walletAddress="0x373DC81415FcB8ded4Bd13BfC73219f6d9845Be8"
        balance={verifierBalance}
      />
      <div className="mt-3">
        <button className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={() => withdrawVerifierFunds()}>Withdraw Funds</button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Pending Approvals</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pendingApprovals.map((approval, index) => (
          <li key={index} className="border p-4">
            {index === 0 ? <CampaignCard campaign={approval} /> : null}
            {index === 0 ?  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => approveCampaign(index)}>Approve</button>
          : null}
          </li>
          
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">Approved Approvals</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {approvedApprovals.map((approval, index) => (
          <li key={index} className="border p-4">
            {approval[0] === '0x0000000000000000000000000000000000000000' ? null : <CampaignCard campaign={approval} />}
          </li>
        ))}
      </ul>
    </div>
  );
}



export default VerifierDashboard;
