import useSWR from "swr";
import { isAddress } from "@ethersproject/address";
import { JsonRpcProvider } from "@ethersproject/providers";
import { RPC_URLS } from "../connectors";

const getENSName = (_, address) => {
  const library = new JsonRpcProvider(RPC_URLS[1]);
  return library.lookupAddress(address);
};

/**
 * @name useENSName
 * @description Gets the ENS name for the active account
 *
 * @returns {String}
 */
export default function useENSName(address) {
  const shouldFetch = isAddress(address);
  const { data } = useSWR(
    shouldFetch ? ["ENSName", address] : null,
    getENSName
  );
  return data;
}
