// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Funding {
    struct Campaign {
        address owner;
        string title;
        uint256 verificationNum;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(address _owner, string memory _title, uint256 _verificationNum, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        require(msg.sender == _owner, "Only the owner can create the campaign");

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
        require(campaigns[i].verificationNum != _verificationNum, "False campaign alert");
        }
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(_deadline > block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.verificationNum = _verificationNum;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        require(msg.value > 0, "Donation amount should be greater than zero");
        

        uint256 amount = msg.value;
        
        Campaign storage campaign = campaigns[_id];
        require(campaign.deadline > block.timestamp, "Donation is not allowed after the deadline");
        require(campaign.amountCollected < campaign.target, "Target already achieved");
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        campaign.amountCollected += amount; // Updating amount collected
    }

    function withdrawFunds(uint256 _id) public payable{
        Campaign storage campaign = campaigns[_id];

        require(msg.sender == campaign.owner, "Only the campaign owner can withdraw funds");
        require(block.timestamp > campaign.deadline, "Withdrawal is only allowed after the deadline");

        uint256 amountToWithdraw = campaign.amountCollected;
        campaign.amountCollected = 0; // Reset the amount collected

        // Transfer funds to the campaign owner
        payable(msg.sender).transfer(amountToWithdraw);
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}