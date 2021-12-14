import useContract from "./useContract";
import useConfig from "./useConfig";

import ABI from "../abis/airdrop.json";

export default function useAirdropContract() {
  const config = useConfig();
  return useContract(config.airdrop, ABI);
}
