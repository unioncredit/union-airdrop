const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");
const ABI = require("./abis/uToken.json");
const { JsonRpcProvider } = require("@ethersproject/providers");

const config = {
  blockRange: 1000,
  startBlock: 16642085,
  infuraKey: "05bc032e727c40d79202e3373090ed55",
  rpcUrl: "https://polygon-mainnet.infura.io/v3/",
};

const uToken = "0xA0e739fF8E0F56346EDc0eb99Bb1478173Ee73ad";

const addressFile = path.resolve("./data/polygon-snapshot.json");
const addressContent = fs.readFileSync(addressFile);
const addresses = JSON.parse(addressContent);

console.log("addresses:", addresses.length);

const provider = new JsonRpcProvider(config.rpcUrl + config.infuraKey);

const utokeContract = new ethers.Contract(uToken, ABI, provider);

async function main() {
  let results = {};

  for (const address of addresses) {
    const res = await utokeContract.checkIsOverdue(address);
    console.log(res);
    results[address] = res;
  }

  console.log(results);

  const content = JSON.stringify(results);
  const filepath = path.resolve("./data/polygon-is-overdue-snapshot.json");
  fs.writeFileSync(filepath, content);

  console.log("file written to:", filepath);
}

main();
