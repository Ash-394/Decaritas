// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

contract Decaritas {
    struct Campaign {
        address owner;
        bool approved;
        uint256 target;
        uint256 verifierFee;
        uint256 totalFundsRequired;
        uint256 deadline;
        uint256 amountCollected;
        address[] donators;
        uint256[] donations;
        uint256 balance;
    }
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => string) public title;
    mapping(uint256 => string) public description;
    mapping(uint256 => string) public image;
    mapping(address => uint256[]) public campaignsByOwner;
    mapping(address => mapping(uint256 => uint256)) public donationsByUser;
    address owner;
    uint256 public numberOfCampaigns = 0;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public {
        require(
            msg.sender == _owner,
            "Only the campaign owner can create campaign"
        );
        uint256 verifierFeePercentage = 1;
        uint256 verifierFee = (_target * verifierFeePercentage) / 100;
        uint256 totalFundsRequired = _target + verifierFee;
        numberOfCampaigns++;
        campaigns[numberOfCampaigns].owner = _owner;
        campaigns[numberOfCampaigns].target = _target;
        campaigns[numberOfCampaigns].verifierFee = verifierFee;
        campaigns[numberOfCampaigns].totalFundsRequired = totalFundsRequired;
        campaigns[numberOfCampaigns].deadline = _deadline;
        title[numberOfCampaigns] = _title;
        description[numberOfCampaigns] = _description;
        image[numberOfCampaigns] = _image;
    }

    function approve(uint256 _id) public onlyOwner {
        campaigns[_id].approved = true;
    }

    function donateToCampaign(uint256 _id) public payable {
        require(msg.value > 0, "Donation amount should be greater than zero");
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];
        require(
            campaign.deadline > block.timestamp,
            "Donation is not allowed after the deadline"
        );
        require(
            campaign.amountCollected < campaign.totalFundsRequired,
            "Target already achieved"
        );
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        donationsByUser[msg.sender][_id] += amount;

        campaign.amountCollected += amount;
        campaign.balance += amount;
    }

    function getDonators(uint256 _id)
        public
        view
        returns (address[] memory, uint256[] memory)
    {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 1; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }
        return allCampaigns;
    }

    function getCampaignsByOwner(address _owner) public view returns (Campaign[] memory) {
        uint256 count = 0;

        for (uint256 i = 1; i <= numberOfCampaigns; i++) {
            if (campaigns[i].owner == _owner) {
                count++;
            }
        }

        Campaign[] memory ownedCampaigns = new Campaign[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= numberOfCampaigns; i++)  {
            if (campaigns[i].owner == _owner) {
                ownedCampaigns[index] = campaigns[i];
                index++;
            }   
        }

        return ownedCampaigns;
    }


    function getCampaignsByDonator(address _donator)
        public
        view
        returns (Campaign[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 1; i < numberOfCampaigns; i++) {
            if (donationsByUser[_donator][i] > 0) {
                count++;
            }
        }

        Campaign[] memory donatedCampaigns = new Campaign[](count);
        uint256 index = 0;
        for (uint256 i = 1; i < numberOfCampaigns; i++) {
            if (donationsByUser[_donator][i] > 0) {
                donatedCampaigns[index] = campaigns[i];
                index++;
            }
        }

        return donatedCampaigns;
    }

    function withdrawFunds(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];
        require(
            campaign.approved,
            "this campiegn is not approved by the verifier"
        );
        require(
            msg.sender == campaign.owner,
            "Only the campaign owner can withdraw funds"
        );
        //require(block.timestamp > campaign.deadline, "Withdrawal is only allowed after the deadline");
        require(
            campaign.balance > campaign.verifierFee,
            "Withdraw only possible if balance is more than verifierFee"
        );
        uint256 amountToWithdraw = campaign.balance - campaign.verifierFee;
        campaign.balance = 0;

        // Transfer funds to the campaign owner
        payable(msg.sender).transfer(amountToWithdraw);
        payable(owner).transfer(campaign.verifierFee);
    }

    function getTotalAmountCollected(address _owner)
        public
        view
        returns (uint256)
    {
        uint256 totalAmount = 0;
        uint256[] storage ownerCampaigns = campaignsByOwner[_owner];

        for (uint256 i = 1; i < ownerCampaigns.length; i++) {
            totalAmount += campaigns[ownerCampaigns[i]].amountCollected;
        }

        return totalAmount;
    }

    function getNumberOfCampaignsByOwner(address _owner)
        public
        view
        returns (uint256)
    {
        return campaignsByOwner[_owner].length;
    }
}