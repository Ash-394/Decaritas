import React from 'react';

function ProfileCard({ name = "Name", walletAddress = "Wallet Address", location = "Location", balance = 0, profileArray }) {
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
        {name != "Name" && <p><span className="font-bold">Name:</span> {name}</p>}
        <p><span className="font-bold">Wallet Address:</span> {walletAddress}</p>
        {location !== "Location" &&<p><span className="font-bold">Location:</span> {location}</p>}
        {walletAddress === "0x373DC81415FcB8ded4Bd13BfC73219f6d9845Be8" && <p><span className="font-bold">Balance:</span> $ {balance.toString()}</p>}

      </div>
    </div>
  );
}

export default ProfileCard;
