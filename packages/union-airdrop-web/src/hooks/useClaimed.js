import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";

import useAirdropContract from "./useAirdropContract";

async function fetchClaimed(_, contract, address) {
  const amount = await contract.claimed(address);
  return amount.gt("0");
}

export default function useClaimed() {
  const { account } = useWeb3React();
  const airdrop = useAirdropContract();

  const shouldFetch = !!airdrop && !!account;

  return useSWR(
    shouldFetch ? ["claimed", airdrop, account] : null,
    fetchClaimed
  );
}
