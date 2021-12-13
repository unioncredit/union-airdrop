const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const jsonFile = fs.readFileSync(
  path.resolve(__dirname, "./data/union-tokens.json")
);
const json = JSON.parse(jsonFile);

const endDate = 1672099200; // Tue Dec 27 2022 00:00:00 GMT+0000

const array = json.map((item) => {
  return ethers.utils.solidityKeccak256(
    ["address", "uint256"],
    [item.address, item.tokens]
  );
});

const merkleTree = new MerkleTree(array, keccak256, {
  sortPairs: true,
});

const root = merkleTree.getHexRoot();

console.log("Root:", root);

console.log("End date:", endDate);
