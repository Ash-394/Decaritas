import React from 'react';

function ProfileCard({ name = "Name", walletAddress = "Wallet Address", location = "Location", balance = null, profileArray }) {
  if (profileArray && profileArray.length > 0) {
    const profile = profileArray[0];
    name = profile.name;
    walletAddress = profile.walletAddress;
    location = profile.location;
    balance = profile.balance;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex flex-col">
        {name !== "Name" && <p className="text-sm text-black mb-2 font-bold font-sans"><span className="font-sans">User name :</span> {name}</p>}
        <p className="text-sm text-black mb-2 font-bold font-sans"><span className="font-sans">Wallet Address:</span> {walletAddress}</p>
        {location !== "Location" &&<p className="text-sm text-black mb-2 font-bold font-sans"><span className="font-sans">Location:</span> {location}</p>}
        {balance !== null && <p className="text-sm text-black mb-2 font-bold font-sans"><span className="font-sans">Total fees collected :</span> $ {balance.toString()}</p>}

      </div>
    </div>
  );
}

export default ProfileCard;
