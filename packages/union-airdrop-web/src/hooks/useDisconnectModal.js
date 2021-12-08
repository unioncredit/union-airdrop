import { newRidgeState } from "react-ridge-state";

export const disconnectModal = newRidgeState(false);

export default function useDisconnectModal() {
  return disconnectModal.use();
}

