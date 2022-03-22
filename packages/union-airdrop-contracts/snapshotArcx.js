const path = require("path");
const csv = require("csvtojson");
const fs = require("fs");

async function main() {
  // .score >= 93
  const covanPath = path.resolve(__dirname, "data/arcx/covan_hodl.csv");
  const covan = await csv().fromFile(covanPath);

  // >= 10
  const indexPath = path.resolve(__dirname, "data/arcx/indexcoop_loyalty.csv");
  const index = await csv().fromFile(indexPath);

  const parsedCovan = covan.filter((x) => Number(x.score) >= 93);
  const parsedIndex = index.filter((x) => Number(x.score) >= 10);

  const addresses = [
    ...parsedCovan.map((x) => x.address),
    ...parsedIndex.map((x) => x.address),
  ];

  const content = JSON.stringify(addresses);
  
  const saveAddressFile = path.join(__dirname, "data/arcx-snapshot.json");
  fs.writeFileSync(saveAddressFile, content);
}

main();
