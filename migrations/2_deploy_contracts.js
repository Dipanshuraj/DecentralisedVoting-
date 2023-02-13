// const KryptoBird= artifacts.require("KryptoBird");
const VotingPlatform = artifacts.require("VotingPlatform.sol");

module.exports = function (deployer){
    deployer.deploy(VotingPlatform);
};