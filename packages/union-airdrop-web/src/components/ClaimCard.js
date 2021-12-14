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

import Avatar from "../components/Avatar";
import useENSName from "../hooks/useENSName";
import truncateAddress from "../utils/truncateAddress";

export default function ClaimCard() {
  const { account } = useWeb3React();

  const ENS = useENSName(account);

  const name = ENS || truncateAddress(account);

  const breakdown = [
    { label: "Base", value: 5000 },
    { label: "Ring Bearer", value: 3141 },
    { label: "Vouches provided (43)", value: 4300 },
    { label: "Vouches received (4)", value: 400 },
    { label: "In Default", value: 500, negative: true },
  ];

  const claimable = 123432;

  const claimed = true;

  const elegible = claimable > 0;

  return (
    <Card>
      <Card.Body>
        <Box>
          <Avatar size={56} address={account} />
          <Box ml="12px" direction="vertical" justify="center">
            <Heading size="small" weight="medium">
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
                {claimable} <Union className="unionSymbol" width="16px" />
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
                <Box justify="space-between" mt="12px">
                  <Label as="p" grey={400}>
                    {stat.label}
                  </Label>
                  <Label as="p" grey={400} align="right">
                    {stat.negative && "-"}
                    {stat.value} UNION
                  </Label>
                </Box>
              ))}
            </Card.Body>
          </Card>
        )}
        {claimed ? (
          <Box
            align="center"
            justify="center"
            className="claimedText"
            mt="30px"
          >
            <Check width="24px" />
            <Text color="green500" align="center" m={0}>
              Claimed 12,341 $UNION
            </Text>
          </Box>
        ) : (
          <Button label="Claim tokens" fluid mt="16px" disabled={!elegible} />
        )}
      </Card.Body>
    </Card>
  );
}
