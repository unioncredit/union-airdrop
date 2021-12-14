import { useMemo } from "react";
import { ethers } from "ethers";
import useSWR from "swr";
import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";

import snapshot from "../snapshot.json";
import useAirdropContract from "./useAirdropContract";

function fetchStoredRoot(_, contract) {
  return contract.merkleRoot();
}

export default function useMerkleRoot() {
  const airdropContract = useAirdropContract();

  const { data: storedRoot } = useSWR(
    !!airdropContract ? ["StoredRoot", airdropContract] : null,
    fetchStoredRoot
  );

  const merkleTree = useMemo(() => {
    const array = snapshot.map((item) => {
      return ethers.utils.solidityKeccak256(
        ["address", "uint256"],
        [item.address, item.tokens]
      );
    });

    return new MerkleTree(array, keccak256, {
      sortPairs: true,
    });
  }, []);

  return { storedRoot, merkleTree };
}
