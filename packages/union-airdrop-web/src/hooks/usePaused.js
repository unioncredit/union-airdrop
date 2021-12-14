import useSWR from "swr";
import useAirdropContract from "./useAirdropContract";

function fetchPaused(_, contract) {
  return contract.paused();
}

export default function usePaused() {
  const airdropContract = useAirdropContract();

  return useSWR(
    !!airdropContract ? ["Paused", airdropContract] : null,
    fetchPaused
  );
}
