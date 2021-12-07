// const fs = require("fs");
// const { ethers } = require("ethers");
// const { JsonRpcProvider } = require("@ethersproject/providers");
// const ABI = require("./abis/userManager.json");
// 
// const network = process.env.NETWORK;
// 
// if (!network) {
//   console.log("No NETWORK provided");
//   process.exit();
// }
// 
// const configs = {
//   polygon: {
//     blockRange: 1000,
//     startBlock: 16642085,
//     infuraKey: "05bc032e727c40d79202e3373090ed55",
//     rpcUrl: "https://polygon-mainnet.infura.io/v3/",
//     address: "0xd99ccdb6E05937e53EFDb099eeAe33D559b20F90",
//   },
//   kovan: {
//     blockRange: 1000000,
//     startBlock: 0,
//     infuraKey: "05bc032e727c40d79202e3373090ed55",
//     rpcUrl: "https://kovan.infura.io/v3/",
//     address: "0xb31718904B5ed1FD2912Fa18957568f38845cC0f",
//   },
// };
