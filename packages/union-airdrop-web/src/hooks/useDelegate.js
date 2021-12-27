import { useCallback } from "react";
import useGovernance from "./useGovernance";

export default function useDelegate() {
  const unionContract = useGovernance();

  return useCallback(
    async (address) => {
      return unionContract.delegate(address);
    },
    [unionContract]
  );
}
