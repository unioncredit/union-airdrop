import { ModalOverlay, Modal, Button, Text, Label } from "union-ui";

import useDisconnectModal from "../hooks/useDisconnectModal";
import { useWeb3React } from "@web3-react/core";

export default function DisconnectModal() {
  const [open, setOpen] = useDisconnectModal();
  const { deactivate, account } = useWeb3React();

  if (!open) {
    return null;
  }

  const disconnect = async () => {
    deactivate();
    setOpen(false);
  };

  return (
    <ModalOverlay onClick={() => setOpen(false)}>
      <Modal onClose={() => setOpen(false)}>
        <Text grey={700} size="large">
          Connected as
        </Text>
        <Label as="p" grey={700} mb="24px">
          {account}
        </Label>
        <Button fluid label="Disconnect" onClick={disconnect} />
      </Modal>
    </ModalOverlay>
  );
}
