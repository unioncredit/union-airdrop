const fs = require("fs");
const path = require("path");
const { uniq } = require("lodash");
const { Parser } = require("json2csv");

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

function calculateUnionTokens(data) {
  let value = 1000;

  if (data.isDefaulted) value -= 500;

  if (data.isRingOwner) value += 1000;

  value += data.borrowers * 100;

  value += data.stakers * 100;

  return value;
}

const addresses = readJsonFile("./data/polygon-snapshot.json");

const defaulted = readJsonFile("./data/polygon-is-overdue-snapshot.json");

const trustUpdates = readJsonFile("./data/polygon-update-trust-snapshot.json");

const ringOwners = readJsonFile("./data/ring-nft-snapshot.json");

const results = [];

for (const address of addresses) {
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
    tokens: calculateUnionTokens(data),
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
