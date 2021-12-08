const { expect } = require("chai");
const { ethers } = require("hardhat");
const chai = require("chai");
const fs = require("fs");
const path = require("path");
const chaiAsPromised = require("chai-as-promised");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

chai.use(chaiAsPromised);

const jsonFile = fs.readFileSync(
  path.resolve(__dirname, "../data/union-tokens.json")
);
const json = JSON.parse(jsonFile);

describe("UnionAirdrop", function () {
  let merkleTree;
  let accounts;
  let u;
  let t;

  beforeEach(async () => {
    accounts = await ethers.getSigners();

    const array = json.map((item) => {
      return ethers.utils.solidityKeccak256(
        ["address", "uint256"],
        [item.address, item.tokens]
      );
    });

    merkleTree = new MerkleTree(array, keccak256, {
      sortPairs: true,
    });

    const root = merkleTree.getHexRoot();

    const TestToken = await ethers.getContractFactory("TestToken");
    t = await TestToken.deploy();
    await t.deployed();

    const UnionAirdrop = await ethers.getContractFactory("UnionAirdrop");
    u = await UnionAirdrop.deploy(root, t.address);
    await u.deployed();
  });

  it("happy path: default", async () => {
    const mainAccount = await accounts[0].getAddress();
    const balance = await t.balanceOf(mainAccount);
    expect(balance.toString()).to.equal("1000000000000000000000000");
  });

  it("happy path: claim", async () => {});
});
