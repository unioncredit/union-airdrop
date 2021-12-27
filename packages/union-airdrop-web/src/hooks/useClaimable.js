import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import snapshot from "../snapshot.json";

export default function useClaimable() {
  const { account } = useWeb3React();

  const data = useMemo(() => {
    if (!account) return null;

    return snapshot.find((item) => item.address === account);
  }, [account]);

  return (
    data || {
      borrowers: 0,
      isDefaulted: false,
      isRingOwner: false,
      stakers: 0,
      tokens: 0,
    }
  );
}
