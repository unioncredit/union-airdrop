import { ModalOverlay, Modal, Button, Box, Text, Avatar } from "union-ui";

import useConnectModal from "../hooks/useConnectModal";
import { SUPPORTED_WALLETS } from "../connectors";
import { useWeb3React } from "@web3-react/core";

export default function ConnectModal() {
  const [open, setOpen] = useConnectModal();
  const { activate } = useWeb3React();

  if (!open) {
    return null;
  }

  return (
    <ModalOverlay onClick={() => setOpen(false)}>
      <Modal title="Connect wallet" onClose={() => setOpen(false)}>
        <Box mb="24px" direction="vertical" mt="16px">
          {Object.keys(SUPPORTED_WALLETS).map((name) => {
            const connector = SUPPORTED_WALLETS[name];

            const handleSignIn = async () => {
              await activate(connector.connector);
              setOpen(false);
            };

            if (
              typeof window !== "undefined" &&
              name === "Injected" &&
              !(window?.ethereum || window?.web3)
            ) {
              return null;
            }

            return (
              <Box align="center" fluid justify="space-between" mb="16px">
                <Box align="center">
                  <Avatar src={connector.icon} size={48} />
                  <Text mb={0} ml="16px">
                    {connector.name}
                  </Text>
                </Box>
                <Button ml="auto" onClick={handleSignIn} label="Connect" />
              </Box>
            );
          })}
        </Box>
      </Modal>
    </ModalOverlay>
  );
}
