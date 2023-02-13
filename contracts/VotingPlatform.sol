// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract VotingPlatform {
    struct Voter {
        bool registered;
        bool allowed;
        string votedOption;
    }

    struct Topic {
        string name;
        string description;
        uint256 expiryTime;
        mapping(string => uint256) voteCount;
        mapping(address => Voter) voters;
        string[] options;
    }

    mapping(uint256 => Topic) public topics;

    function createTopic(
        uint256 id,
        string memory name,
        string memory description,
        uint256 expiryTime
    ) public {
        require(topics[id].expiryTime == 0, "Topic already exists.");
        Topic storage topic = topics[id];
        topic.name = name;
        topic.description = description;
        topic.expiryTime = expiryTime;
    }

    function addOption(uint256 id, string memory option) public {
        Topic storage topic = topics[id];
        topic.options.push(option);
    }

    function register(uint256 id) public {
        Topic storage topic = topics[id];
        Voter storage voter = topic.voters[msg.sender];
        require(!voter.registered, "Already registered.");
        voter.registered = true;
    }

    function approveVoter(uint256 id, address voterAddress) public {
        Topic storage topic = topics[id];
        Voter storage voter = topic.voters[voterAddress];
        require(!voter.allowed, "Already allowed.");
        voter.allowed = true;
    }

    function rejectVoter(uint256 id, address voterAddress) public {
        Topic storage topic = topics[id];
        Voter storage voter = topic.voters[voterAddress];
        require(voter.registered, "Not registered.");
        voter.registered = false;
    }

    function vote(uint256 id, string memory option) public {
        Topic storage topic = topics[id];
        Voter storage voter = topic.voters[msg.sender];
        require(voter.registered && voter.allowed, "Not allowed to vote.");
        require(block.timestamp < topic.expiryTime, "Voting has expired.");
        require(bytes(voter.votedOption).length == 0, "Already voted.");
        for (uint256 i = 0; i < topic.options.length; i++) {
            if (
                keccak256(bytes(topic.options[i])) == keccak256(bytes(option))
            ) {
                voter.votedOption = option;
                topic.voteCount[option]++;
                break;
            }
        }
    }

    function getVoteCount(uint256 id, string memory option)
        public
        view
        returns (uint256)
    {
        Topic storage topic = topics[id];
        require(block.timestamp >= topic.expiryTime, "Voting has not expired.");
        return topic.voteCount[option];
    }
}
