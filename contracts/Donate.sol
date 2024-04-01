// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./verifier.sol";

contract Donate {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        uint256 balance; 
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(address => uint256[]) public campaignsByOwner;
    mapping(address => mapping(uint256 => uint256)) public donationsByUser;

    uint256 public numberOfCampaigns = 0;

    Verifier public verifierContract;

    constructor(address _verifierContract) {
        verifierContract = Verifier(_verifierContract);
    }

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public {
        verifierContract.requestCampaignApproval(_owner, _title, _description, _target, _deadline, _image);
    }

    function approveAndCreateCampaign(uint256 _index) external {
        Verifier.CampaignApproval[] memory pendingApprovals = verifierContract.getPendingApprovals();

        require(_index < pendingApprovals.length, "Invalid index");
        Verifier.CampaignApproval memory approval = pendingApprovals[_index];

        // campaign is created is its approved by the verifier ; status = true
        require(approval.status == Verifier.CampaignStatus.Approved, "Campaign not approved yet");

        Campaign storage newCampaign = campaigns[numberOfCampaigns];
        newCampaign.owner = approval.campaignOwner;
        newCampaign.title = approval.title;
        newCampaign.description = approval.description;
        newCampaign.target = approval.target;
        newCampaign.deadline = approval.deadline;
        newCampaign.image = approval.image;
        newCampaign.amountCollected = 0;
        newCampaign.balance = 0; 

        campaignsByOwner[newCampaign.owner].push(numberOfCampaigns);

        numberOfCampaigns++;
    }
    
    function donateToCampaign(uint256 _id) public payable {
        require(msg.value > 0, "Donation amount should be greater than zero");
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];
        require(campaign.deadline > block.timestamp, "Donation is not allowed after the deadline");
        require(campaign.amountCollected < campaign.target, "Target already achieved");
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        donationsByUser[msg.sender][_id] += amount;

        campaign.amountCollected += amount;
        campaign.balance += amount; 
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

    function getCampaignsByDonator(address _donator) public view returns (Campaign[] memory) {
        uint256 count = 0;
        for(uint256 i = 0; i < numberOfCampaigns; i++) {
            if(donationsByUser[_donator][i] > 0) {
                count++;
            }
        }

        Campaign[] memory donatedCampaigns = new Campaign[](count);
        uint256 index = 0;
        for(uint256 i = 0; i < numberOfCampaigns; i++) {
            if(donationsByUser[_donator][i] > 0) {
                donatedCampaigns[index] = campaigns[i];
                index++;
            }
        }

        return donatedCampaigns;
    }

    function withdrawFunds(uint256 _id) public payable{
        Campaign storage campaign = campaigns[_id];

        require(msg.sender == campaign.owner, "Only the campaign owner can withdraw funds");
        //require(block.timestamp > campaign.deadline, "Withdrawal is only allowed after the deadline");

        uint256 amountToWithdraw = campaign.balance;
        campaign.balance = 0;

        // Transfer funds to the campaign owner
        payable(msg.sender).transfer(amountToWithdraw);
    }

    function getTotalAmountCollected(address _owner) public view returns (uint256) {
        uint256 totalAmount = 0;
        uint256[] storage ownerCampaigns = campaignsByOwner[_owner];

        for (uint256 i = 0; i < ownerCampaigns.length; i++) {
            totalAmount += campaigns[ownerCampaigns[i]].amountCollected;
        }

        return totalAmount;
    }

    function getNumberOfCampaignsByOwner(address _owner) public view returns (uint256) {
        return campaignsByOwner[_owner].length;
    }
}


/*
verifier addr -0xBE8CE8CEb81CF4a2a03bc0e329149d8CBD0E6d8E
donate addr - 0xDaF6d3Da4467A0eF8a608178b769c03E9466AaC3
*/