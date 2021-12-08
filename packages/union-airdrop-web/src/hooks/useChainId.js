import { useWeb3React } from "@web3-react/core";

const defaultChainId = 1;

export default function useChainId() {
  const { chainId } = useWeb3React();

  return chainId || defaultChainId;
}
