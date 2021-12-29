import { Text, Box, Card, Divider, Heading, Button } from "union-ui";
import { ReactComponent as Twitter } from "union-ui/lib/icons/twitter.svg";
import { ReactComponent as Discord } from "union-ui/lib/icons/discord.svg";
import { ReactComponent as Check } from "union-ui/lib/icons/wireCheck.svg";

export default function Claimed() {
  return (
    <Card>
      <Card.Body>
        <Box align="center" justify="center" className="claimedText">
          <Text color="green500" align="center" m={0}>
            UNION Claimed
          </Text>
          <Check width="24px" />
        </Box>
        <Divider my="24px" />
        <Heading align="center" size="xlarge">
          What’s next?
        </Heading>
        <Text align="center" grey={400}>
          You claimed your UNION distribution. Now it’s time to get your
          governance hat on, for the good of the protocol.
        </Text>
        <Button
          mt="24px"
          fluid
          variant="secondary"
          label="Join the DAO on Discord"
          icon={Discord}
        />
        <Button
          mt="8px"
          fluid
          variant="secondary"
          label="Follow on Twitter for updates"
          icon={Twitter}
        />
      </Card.Body>
    </Card>
  );
}
