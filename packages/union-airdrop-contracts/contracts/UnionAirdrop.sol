//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract UnionAirdrop is Ownable {
  using SafeERC20 for IERC20;

  bytes32 public merkleRoot;

  address public token;

  bool public paused;

  uint256 public endDate;
  
  // address to amount claimed
  mapping(address => uint256) public claimed;

  event TokensClaimed(address sender, uint256 amount);

  constructor(bytes32 _root, address _token, bool _paused, uint256 _endDate) {
    merkleRoot = _root;
    token = _token;
    endDate = _endDate;
    paused = _paused;
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

  function setEndDate(uint256 _endDate) public onlyOwner {
    endDate = _endDate;
  }

  function claimTokens(bytes32[] memory proof, uint256 amount) public {
    require(!paused, "paused");
    require(block.timestamp < endDate, "claim period ended");
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
    IERC20(token).safeTransfer(msg.sender, amount);

    emit TokensClaimed(msg.sender, amount);
  }

  function recoverTokens(address erc20Token, uint256 amount) public onlyOwner {
    IERC20(erc20Token).safeTransfer(msg.sender, amount);
  }
}
