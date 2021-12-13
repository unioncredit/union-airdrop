import { Link } from "react-router-dom";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { Text, Button, Layout, Box, Grid, Wallet } from "union-ui";
import { ReactComponent as Logo } from "union-ui/lib/icons/logo.svg";

import ConnectModal from "./ConnectModal";
import DisconnectModal from "./DisconnectModal";
import Avatar from "./Avatar";

import useConnectModal from "../hooks/useConnectModal";
import useENSName from "../hooks/useENSName";
import useDisconnectModal from "../hooks/useDisconnectModal";

export default function Wrapper({ children }) {
  const { account, error } = useWeb3React();

  const ENS = useENSName(account);

  const [, setConnectModalOpen] = useConnectModal();
  const [, setDisconnectModalOpen] = useDisconnectModal();

  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

  const name = ENS || account?.slice(0, 6);

  return (
    <Layout>
      <Layout.Main>
        <Grid>
          <Grid.Row>
            <Grid.Col>
              <Box className="logo-wrapper" justify="start" fluid>
                <Link to="/">
                  <Logo width="24px" />
                </Link>
              </Box>
            </Grid.Col>
            <Grid.Col>
              <Box fluid align="center">
                {account ? (
                  <Box ml="auto">
                    <Wallet
                      name={name}
                      avatar={<Avatar address={account} />}
                      onClick={() => setDisconnectModalOpen(true)}
                    />
                  </Box>
                ) : (
                  <Button
                    ml="auto"
                    variant="secondary"
                    label="Connect"
                    onClick={() => setConnectModalOpen(true)}
                  />
                )}
              </Box>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col>
              <Box
                fluid
                align="center"
                direction="vertical"
                className="inner-wrapper"
              >
                <Box maxw="446px" direction="vertical" mt="96px" fluid>
                  {isUnsupportedChainIdError && (
                    <Text mt="24px" align="center" color="red600">
                      You are on an unsupported chain. Please connect to
                      ethereum mainnet
                    </Text>
                  )}
                  {children}
                </Box>
              </Box>
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </Layout.Main>
      <ConnectModal />
      <DisconnectModal />
    </Layout>
  );
}
