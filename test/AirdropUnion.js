const { expect } = require("chai");
const { ethers } = require("hardhat");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

chai.use(chaiAsPromised);

describe("UnionAirdrop", function () {
  let merkleTree;
  let accounts;
  let u;
  let t;

  beforeEach(async () => {
    accounts = await ethers.getSigners();

    const addresses = await Promise.all(
      accounts.map(async (account) => {
        const address = await account.getAddress();
        return ethers.utils.solidityKeccak256(["address"], [address]);
      })
    );

    merkleTree = new MerkleTree(addresses, keccak256, {
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
});
