import React from 'react';

function ProfileCard({ name = "Name", walletAddress = "Wallet Address", location = "Location", profileArray }) {
  if (profileArray && profileArray.length > 0) {
    const profile = profileArray[0];
    name = profile.name;
    walletAddress = profile.walletAddress;
    location = profile.location;
  }

  return (
    <div className="profile-details">
      <h2>Name: {name}</h2>
      <p>Wallet Address: {walletAddress}</p>
      <p>Location: {location}</p>
    </div>
  );
}

export default ProfileCard;
