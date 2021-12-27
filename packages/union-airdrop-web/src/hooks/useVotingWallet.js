import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";
import useGovernance from "./useGovernance";

async function fetchVotingWallet(_, contract, address) {
  const delegates = await contract.delegates(address);
  return delegates;
}

export default function useVotingWallet() {
  const { account } = useWeb3React();
  const governance = useGovernance();

  const shouldFetch = !!governance && !!account;

  return useSWR(
    shouldFetch ? ["votingWallet", governance, account] : null,
    fetchVotingWallet
  );
}
