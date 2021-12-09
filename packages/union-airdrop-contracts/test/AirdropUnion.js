const { expect } = require("chai");
const { ethers } = require("hardhat");
const chai = require("chai");
const fs = require("fs");
const path = require("path");
const chaiAsPromised = require("chai-as-promised");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const { parseEther } = require("ethers/lib/utils");

chai.use(chaiAsPromised);

const jsonFile = fs.readFileSync(
  path.resolve(__dirname, "../data/union-tokens.json")
);
const json = JSON.parse(jsonFile);

const amount = 123456789;

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

    const mainAccount = await accounts[0].getAddress();
    array.push(
      ethers.utils.solidityKeccak256(
        ["address", "uint256"],
        [mainAccount, amount]
      )
    );

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

  it("happy path: claim", async () => {
    await t.transfer(u.address, parseEther("1"));
    const balance = await t.balanceOf(u.address);
    console.log("UnionAirdrop balance:", balance.toString());

    const mainAccount = await accounts[0].getAddress();

    const leaf = ethers.utils.solidityKeccak256(
      ["address", "uint256"],
      [mainAccount, amount]
    );

    const proof = merkleTree.getHexProof(leaf);
    await u.claimTokens(proof, amount);
  });

  it("happy path: recoverTokens", async () => {
    await t.transfer(u.address, parseEther("1"));
    const balance = await t.balanceOf(u.address);
    console.log("UnionAirdrop balance:", balance.toString());

    await u.recoverTokens(t.address, balance);

    const newBalance = await t.balanceOf(u.address);
    expect(newBalance.toString()).to.equal("0");

    const mainAccount = await accounts[0].getAddress();
    const mainAccountBalance = await t.balanceOf(mainAccount);

    expect(mainAccountBalance.toString()).to.equal("1000000000000000000000000");
  });
});
