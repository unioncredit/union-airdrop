import { useCallback, useMemo } from "react";
import { ethers } from "ethers";

import useContract from "./useContract";
import useConfig from "./useConfig";

import ABI from "../abis/multicall.json";

export default function useMulticall(abi) {
  const config = useConfig();
  const multiCall = useContract(config?.multicall, ABI);

  const itf = useMemo(() => new ethers.utils.Interface(abi), [abi]);

  const mutliCallHandler = useCallback(
    async (calls) => {
      const calldata = calls.map((call) => [
        call.address.toLowerCase(),
        itf.encodeFunctionData(call.name, call.params),
      ]);
      const { returnData } = await multiCall.aggregate(calldata, {
        gasLimit: 30000000,
      });
      const resp = returnData.map((call, i) =>
        itf.decodeFunctionResult(calls[i].name, call)
      );
      return resp;
    },
    [itf, multiCall]
  );

  return multiCall && mutliCallHandler;
}
