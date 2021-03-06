import {
  Card,
  Heading,
  Button,
  Box,
  Badge,
  Divider,
  Stat,
  Alert,
} from "union-ui";
import { useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { ReactComponent as Union } from "union-ui/lib/icons/union.svg";
import { ReactComponent as Info } from "union-ui/lib/icons/wireInfo.svg";
import { ReactComponent as Check } from "union-ui/lib/icons/wireCheck.svg";
import { commify, formatEther } from "@ethersproject/units";

import Avatar from "../components/Avatar";
import useENSName from "../hooks/useENSName";
import truncateAddress from "../utils/truncateAddress";
import useClaimable from "../hooks/useClaimable";
import useMerkleRoot from "../hooks/useMerkleRoot";
import usePaused from "../hooks/usePaused";
import useNotConnected from "../hooks/useNotConnected";
import Breakdown from "../components/Breakdown";
import Claimed from "../components/Claimed";
import Delegate from "../components/Delegate";
import useVotingWallet from "../hooks/useVotingWallet";
import useClaimed from "../hooks/useClaimed";

export default function ClaimCard() {
  useNotConnected();

  const [showDelegate, setShowDelegate] = useState(false);
  const { account } = useWeb3React();
  const { data: paused } = usePaused();
  const { storedRoot, merkleTree } = useMerkleRoot();
  const { data: delegate } = useVotingWallet();
  const { data: claimed } = useClaimed();

  const ENS = useENSName(account);

  const {
    tokens,
    borrowers,
    isDefaulted,
    isRingOwner,
    stakers,
  } = useClaimable();

  const name = ENS || truncateAddress(account);

  const breakdown = [
    { label: "Base", value: 5000 },
    { label: "Ring Bearer", value: isRingOwner ? 3141 : 0 },
    { label: `Vouches provided (${borrowers})`, value: borrowers * 100 },
    { label: `Vouches received (${stakers})`, value: stakers * 100 },
    { label: "In Default", value: 500, negative: isDefaulted },
  ];

  const elegible = tokens > 0;

  const active = !paused && storedRoot === merkleTree.getHexRoot();

  const delegated = delegate && !ethers.BigNumber.from(delegate).eq("0");

  console.log("roots:", storedRoot, merkleTree.getHexRoot());

  if (claimed) {
    return <Claimed />;
  }

  return (
    <Card>
      <Card.Body>
        <Box>
          <Avatar size={56} address={account} />
          <Box ml="12px" direction="vertical" justify="center">
            <Heading weight="medium" mb="4px">
              {name}
            </Heading>
            <Badge color="grey" label={truncateAddress(account)} />
          </Box>
        </Box>
        <Divider mt="24px" mb="24px" />
        <Box justify="center" mb="16px">
          <Stat
            size="large"
            align="center"
            label="CLAIMABLE UNION"
            value={
              <>
                {commify(Number(formatEther(tokens)).toFixed(0))}{" "}
                <Union className="unionSymbol" width="16px" />
              </>
            }
          />
        </Box>
        {!elegible ? (
          <Alert
            size="small"
            icon={<Info />}
            label="You???re not elegible for the UNION distribution"
          />
        ) : (
          <>
            {!delegated && showDelegate ? (
              <Delegate />
            ) : (
              <>
                <Breakdown
                  breakdown={breakdown}
                  disabled={!active}
                  tokens={tokens}
                  merkleTree={merkleTree}
                  hideButton={!delegated && !showDelegate}
                />
                {!delegated && !showDelegate && (
                  <Button
                    fluid
                    mt="16px"
                    onClick={() => setShowDelegate(true)}
                    label="Delegate Votes to Claim"
                  />
                )}
              </>
            )}
          </>
        )}

        {!active && (
          <Alert
            mt="16px"
            size="small"
            icon={<Check />}
            label="Claiming not active"
          />
        )}
      </Card.Body>
    </Card>
  );
}
