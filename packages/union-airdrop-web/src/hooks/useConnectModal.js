import { newRidgeState } from "react-ridge-state";

export const connectModal = newRidgeState(false);

export default function useConnectModal() {
  return connectModal.use();
}
