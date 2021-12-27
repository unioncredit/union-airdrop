import { useCallback } from "react";
import useAirdropContract from "./useAirdropContract";

export default function useClaim() {
  const airdrop = useAirdropContract();

  return useCallback(
    (proof, amount) => {
      return airdrop.claimTokens(proof, amount);
    },
    [airdrop]
  );
}
