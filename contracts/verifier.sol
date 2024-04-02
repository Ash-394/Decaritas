// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Verifier {
    enum CampaignStatus { Pending, Approved }

    struct CampaignApproval {
        address campaignOwner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        string image;
        CampaignStatus status;
    }

    CampaignApproval[] public pendingApprovals;
    mapping(uint256 => bool) public approvedCampaigns;

    event CampaignApproved(uint256 indexed index);

    function requestCampaignApproval(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public {
        CampaignApproval memory newApproval = CampaignApproval({
            campaignOwner: _owner,
            title: _title,
            description: _description,
            target: _target,
            deadline: _deadline,
            image: _image,
            status: CampaignStatus.Pending
        });
        pendingApprovals.push(newApproval);
    }

    function approveCampaign(uint256 _index) public {
        require(_index < pendingApprovals.length, "Invalid index");

        CampaignApproval storage approval = pendingApprovals[_index];
        approval.status = CampaignStatus.Approved;
        approvedCampaigns[_index] = true;

        emit CampaignApproved(_index);
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
}

/* mumbai
v - 0x1d83eAb5E9Cc764ED9c25615630C72E5287522C2
d - 0xD8c22c5b4DF8c989366092e46CA3e223603b6342
*/