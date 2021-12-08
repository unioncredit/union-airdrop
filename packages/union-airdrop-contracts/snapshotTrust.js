const { ethers } = require("ethers");
const ABI = require("./abis/userManager.json");
const fs = require("fs");
const { JsonRpcProvider } = require("@ethersproject/providers");
const uniq = require("lodash/uniq");

const network = process.env.NETWORK;

if (!network) {
  console.log("No NETWORK provided");
  process.exit();
}

const configs = {
  polygon: {
    blockRange: 1000,
    startBlock: 16642085,
    infuraKey: "05bc032e727c40d79202e3373090ed55",
    rpcUrl: "https://polygon-mainnet.infura.io/v3/",
    address: "0xd99ccdb6E05937e53EFDb099eeAe33D559b20F90",
  },
  kovan: {
    blockRange: 1000000,
    startBlock: 0,
    infuraKey: "05bc032e727c40d79202e3373090ed55",
    rpcUrl: "https://kovan.infura.io/v3/",
    address: "0xb31718904B5ed1FD2912Fa18957568f38845cC0f",
  },
};

if (!Object.keys(configs).includes(network)) {
  console.log("NETWORK not valid");
  process.exit();
}

const config = configs[network];

const blockRange = config.blockRange;
const startBlock = config.startBlock;
const infuraKey = config.infuraKey;
const rpcUrl = config.rpcUrl + infuraKey;
const address = config.address;

const provider = new JsonRpcProvider(rpcUrl);

const userContract = new ethers.Contract(address, ABI, provider);

async function getRegisterLogs() {
  const endBlock = await provider.getBlockNumber();
  console.log(`Current block: ${endBlock}`);
  const filter = userContract.filters.LogUpdateTrust();

  let results = [];
  let block = startBlock;
  while (block + blockRange < endBlock) {
    try {
      const logs = await provider.getLogs({
        fromBlock: block,
        toBlock: block + blockRange,
        ...filter,
      });

      const parsed = logs.map((log) => {
        const logData = userContract.interface.parseLog(log);
        return {
          borrower: logData.args.borrower,
          staker: logData.args.staker,
          amount: logData.args.trustAmount.toString(),
        };
      });

      const uniqResults = uniq(parsed);

      results = [...results, ...uniqResults];
      block += blockRange;

      console.log(uniqResults);
      console.log(`[*] at block ${block}`);
      console.log(`[*] parsed ${parsed.length} logs, total: ${results.length}`);
    } catch (error) {
      console.log(error.message);
      console.log("[-] error trying again in 5 second");
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  const content = JSON.stringify(results);
  fs.writeFileSync(
    "./data/" + network + "-update-trust-snapshot.json",
    content
  );
}

getRegisterLogs();
