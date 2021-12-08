import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import MetaMask from "union-ui/lib/icons/metamask.svg";
import WalletConnect from "union-ui/lib/icons/walletconnect.svg";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4],
});

const POLLING_INTERVAL = 12000;

export const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/05bc032e727c40d79202e3373090ed55",
  4: "https://rinkeby.infura.io/v3/05bc032e727c40d79202e3373090ed55",
};

export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: RPC_URLS[1],
    4: RPC_URLS[4],
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const CONNECTORS = {
  Injected: injected,
};

export const SUPPORTED_WALLETS = {
  MetaMask: {
    connector: injected,
    name: "MetaMask",
    icon: MetaMask,
  },
  WalletConnect: {
    connector: walletconnect,
    name: "WalletConnect",
    icon: WalletConnect,
  },
};
