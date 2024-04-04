// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Verifier {
    struct CampaignApproval {
        address campaignOwner;
        string title;
        string description;
        uint256 target;
        uint256 verifierFee;
        uint256 totalFundsRequired;
        uint256 deadline;
        string image;
    }

    CampaignApproval[] public pendingApprovals;
    mapping(uint256 => bool) public approvedCampaigns;
    uint256 public verifierBalance;

    event VerifierFeeReceived(uint256 amount);
    event VerifierWithdrawal(address indexed recipient, uint256 amount);

    event CampaignApproved(uint256 indexed index, CampaignApproval approval);

    function requestCampaignApproval(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _verifierFee, uint256 _totalFundsRequired,  uint256 _deadline, string memory _image) public {
        CampaignApproval memory newApproval = CampaignApproval({
            campaignOwner: _owner,
            title: _title,
            description: _description,
            target: _target,
            verifierFee: _verifierFee,
            totalFundsRequired: _totalFundsRequired,
            deadline: _deadline,
            image: _image
        });
        pendingApprovals.push(newApproval);
    }

    function approveCampaign(uint256 _index) public {
        require(_index < pendingApprovals.length, "Invalid index");

        CampaignApproval storage approval = pendingApprovals[_index];
        approvedCampaigns[_index] = true;

        emit CampaignApproved(_index, approval);
    }

    function getPendingApprovals() public view returns (CampaignApproval[] memory) {
        return pendingApprovals;
    }

    function getApprovedCampaigns() public view returns (CampaignApproval[] memory) {
        CampaignApproval[] memory approvedList = new CampaignApproval[](pendingApprovals.length);

        uint256 index = 0;
        for (uint256 i = 0; i < pendingApprovals.length; i++) {
            if (approvedCampaigns[i]) {
                approvedList[index] = pendingApprovals[i];
                index++;
            }
        }

        return approvedList;
    }

    function addVerifierFee() external payable {
        verifierBalance += msg.value;
        emit VerifierFeeReceived(msg.value);
    }

    function withdrawVerifierFunds() external {
        require(msg.sender == 0x373DC81415FcB8ded4Bd13BfC73219f6d9845Be8 , "Only the verifier can withdraw verifier funds");

        uint256 amountToWithdraw = verifierBalance;
        verifierBalance = 0;
        
        payable(msg.sender).transfer(amountToWithdraw);
        emit VerifierWithdrawal(msg.sender, amountToWithdraw);
    }
}

