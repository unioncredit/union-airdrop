import useContract from "./useContract";
import useConfig from "./useConfig";

import ABI from "../abis/governor.json";

export default function useGovernance() {
  const config = useConfig();
  return useContract(config?.governance, ABI);
}
