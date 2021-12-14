import { useWeb3React } from "@web3-react/core";
import {
  Card,
  Text,
  Heading,
  Box,
  Button,
  Badge,
  Divider,
  Stat,
  Label,
  Alert,
} from "union-ui";
import { ReactComponent as Union } from "union-ui/lib/icons/union.svg";
import { ReactComponent as Info } from "union-ui/lib/icons/wireInfo.svg";
import { ReactComponent as Check } from "union-ui/lib/icons/wireCheck.svg";
import { commify } from "@ethersproject/units";

import Avatar from "../components/Avatar";
import useENSName from "../hooks/useENSName";
import truncateAddress from "../utils/truncateAddress";
import useClaimable from "../hooks/useClaimable";
import useMerkleRoot from "../hooks/useMerkleRoot";
import usePaused from "../hooks/usePaused";
import useNotConnected from "../hooks/useNotConnected";

export default function ClaimCard() {
  useNotConnected();

  const { account } = useWeb3React();
  const { data: paused } = usePaused();
  const { storedRoot, merkleTree } = useMerkleRoot();

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

  const claimed = false;

  const elegible = tokens > 0;

  const active = !paused && storedRoot === merkleTree.getHexRoot();

  console.log("roots:", storedRoot, merkleTree.getHexRoot());

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
                {commify(tokens)} <Union className="unionSymbol" width="16px" />
              </>
            }
          />
        </Box>
        {!elegible ? (
          <Alert
            size="small"
            icon={<Info />}
            label="You’re not elegible for the $UNION distribution"
          />
        ) : (
          <Card packed className="greyCard">
            <Card.Body>
              <Text align="center" grey={800}>
                Your Distribution Breakdown
              </Text>
              {breakdown.map((stat) => (
                <Box justify="space-between" mt="12px" key={stat.label}>
                  <Label as="p" grey={400} m={0}>
                    {stat.label}
                  </Label>
                  <Label as="p" grey={400} align="right" m={0}>
                    {stat.negative && "-"}
                    {commify(stat.value)} UNION
                  </Label>
                </Box>
              ))}
            </Card.Body>
          </Card>
        )}

        {!active && (
          <Alert
            mt="16px"
            size="small"
            icon={<Check />}
            label="Claiming not active"
          />
        )}

        {claimed ? (
          <Box
            align="center"
            justify="center"
            className="claimedText"
            mt="24px"
          >
            <Check width="24px" />
            <Text color="green500" align="center" m={0}>
              Claimed {commify(tokens)} UNION
            </Text>
          </Box>
        ) : (
          <Button
            label="Claim tokens"
            fluid
            mt="16px"
            disabled={!elegible || !active}
          />
        )}
      </Card.Body>
    </Card>
  );
}
