const fs = require("fs");
const path = require("path");
const { uniq, uniqBy } = require("lodash");
const { Parser } = require("json2csv");
const { parseEther, formatEther, commify } = require("ethers/lib/utils");
const { ethers } = require("ethers");

function readJsonFile(path) {
  return JSON.parse(fs.readFileSync(path));
}

function uniqTrust(data, address, propertyA, propertyB) {
  const res = data
    .map(
      (item) =>
        item[propertyA].toLowerCase() === address.toLowerCase() &&
        item[propertyB]
    )
    .filter(Boolean);

  return uniq(res);
}

function calculateUnionTokens(data, initialValue) {
  let value = initialValue;

  if (data.isDefaulted) value -= 500;

  if (data.isRingOwner) value += 3141;

  value += data.borrowers * 100;

  value += data.stakers * 100;

  const total = value >= 25000 ? 25000 : value;

  return parseEther(total.toString()).toString();
}

let addresses = readJsonFile("./data/polygon-snapshot.json");
addresses = addresses.map((address) => ({ address, initialValue: 5000 }));

const defaulted = readJsonFile("./data/polygon-is-overdue-snapshot.json");

const trustUpdates = readJsonFile("./data/polygon-update-trust-snapshot.json");

const ringOwners = readJsonFile("./data/ring-nft-snapshot.json");

let arcxAddresses = readJsonFile("./data/arcx-snapshot.json");
const arcxInitialvalue = Math.floor(1e6 / arcxAddresses.length);
arcxAddresses = arcxAddresses.map((address) => ({
  address,
  initialValue: arcxInitialvalue,
}));

const results = [];

for (const item of uniqBy([...addresses, ...arcxAddresses], "address")) {
  const address = item.address;

  const isDefaulted = defaulted[address];

  const isRingOwner = ringOwners[address];

  const uniqueBorrower = uniqTrust(trustUpdates, address, "borrower", "staker");

  const uniqueStakers = uniqTrust(trustUpdates, address, "staker", "borrower");

  const data = {
    address,
    isDefaulted,
    isRingOwner,
    borrowers: uniqueStakers.length,
    stakers: uniqueBorrower.length,
  };

  results.push({
    ...data,
    tokens: calculateUnionTokens(data, item.initialValue),
  });
}

// save CSV
const fields = Object.keys(results[0]);
const opts = { fields };
const parser = new Parser(opts);
const csv = parser.parse(results);

const csvPath = path.resolve("./data/union-tokens.csv");
const jsonPath = path.resolve("./data/union-tokens.json");

fs.writeFileSync(csvPath, csv);

console.log(".csv saved to:", csvPath);

fs.writeFileSync(jsonPath, JSON.stringify(results));

console.log(".json saved to:", jsonPath);

console.log("============================");
console.log("           summary          ");
console.log("============================");

const totalAddresses = results.length;
console.log(`total addresses: ${totalAddresses}`);

const totalTokens = results.reduce((acc, item) => {
  return ethers.BigNumber.from(item.tokens).add(acc);
}, ethers.BigNumber.from("0"));

console.log(`total tokens: ${commify(formatEther(totalTokens))}`);
