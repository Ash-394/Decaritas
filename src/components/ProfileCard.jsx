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
      <h2 className="text-xl font-bold mb-2">Profile</h2>
      <div className="flex flex-col">
        {name !== "Name" && <p><span className="font-bold">Name:</span> {name}</p>}
        <p><span className="font-bold">Wallet Address:</span> {walletAddress}</p>
        {location !== "Location" &&<p><span className="font-bold">Location:</span> {location}</p>}
        {balance !== null && <p><span className="font-bold">Balance:</span> $ {balance.toString()}</p>}

      </div>
    </div>
  );
}

export default ProfileCard;
