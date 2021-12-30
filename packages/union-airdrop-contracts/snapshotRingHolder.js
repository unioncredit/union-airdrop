const { ethers } = require("ethers");
const ABI = require("./abis/erc721.json");
const fs = require("fs");
const path = require("path");
const { JsonRpcProvider } = require("@ethersproject/providers");

const config = {
  blockRange: 1000,
  startBlock: 16642085,
  infuraKey: "05bc032e727c40d79202e3373090ed55",
  rpcUrl: "https://mainnet.infura.io/v3/",
  address: "0xd99ccdb6E05937e53EFDb099eeAe33D559b20F90",
};

const ringNFT = "0x1aa3be1ff6493d4eca5c27dba83c0f6ee95154be";

const addressFile = path.resolve("./data/polygon-snapshot.json");
const addressContent = fs.readFileSync(addressFile);
const addresses = JSON.parse(addressContent);

console.log("addresses:", addresses.length);

const provider = new JsonRpcProvider(config.rpcUrl + config.infuraKey);

const ringContract = new ethers.Contract(ringNFT, ABI, provider);

async function hasRing(address) {
  const resp = await ringContract.balanceOf(address);
  return resp.gt(0);
}

async function main() {
  let results = {};
  for (const address of addresses) {
    console.log("checking address:", address);
    const res = await hasRing(address);
    results[address] = res;
  }

  console.log(results);

  const content = JSON.stringify(results);
  const filepath = path.resolve("./data/ring-nft-snapshot.json");
  fs.writeFileSync(filepath, content);

  console.log("file written to:", filepath);
}

main();
