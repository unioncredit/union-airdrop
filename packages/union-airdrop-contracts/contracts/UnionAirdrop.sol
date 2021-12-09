//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract UnionAirdrop is Ownable {
  bytes32 public merkleRoot;

  address public token;

  bool public paused;
  
  // address to amount claimed
  mapping(address => uint256) public claimed;

  event TokensClaimed(address sender, uint256 amount);

  constructor(bytes32 _root, address _token) {
    merkleRoot = _root;
    token = _token;
  }

  function setMerkleRoot(bytes32 root) public onlyOwner {
    merkleRoot = root;
  }

  function setToken(address _token) public onlyOwner {
    token = _token;
  }

  function setPaused(bool _paused) public onlyOwner {
    paused = _paused;
  }

  function claimTokens(bytes32[] memory proof, uint256 amount) public {
    require(!paused, "paused");
    require(claimed[msg.sender] == 0, "sender already claimed");

    require(
      MerkleProof.verify(
        proof,
        merkleRoot,
        keccak256(abi.encodePacked(msg.sender, amount))
      ),
      "bad proof"
    );


    claimed[msg.sender] = amount;
    IERC20(token).transfer(msg.sender, amount);

    emit TokensClaimed(msg.sender, amount);
  }

  function recoverTokens(address erc20Token, uint256 amount) public onlyOwner {
    IERC20(erc20Token).transfer(msg.sender, amount);
  }
}
