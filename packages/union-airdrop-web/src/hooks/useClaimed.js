import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";

import useAirdropContract from "./useAirdropContract";

function fetchClaimed(_, contract, address) {
  return contract.claims(address);
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
