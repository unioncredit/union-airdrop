import { Link } from "react-router-dom";
import { ButtonRow, Button, Box, Heading, Text, Label } from "union-ui";

export default function Home() {
  return (
    <Box direction="vertical" align="center" justify="center">
      <video width="80px" autoPlay loop muted controls={false}>
        <source src="/token.mp4" type="video/mp4" />
      </video>
      <Heading align="center" mt="24px">
        UNION Governance Token
      </Heading>
      <Text align="center" grey={400}>
        $UNION is voting power and voice for the Union protocol. Tokens are
        claimable by early participants of Union’s protocol.
      </Text>
      <Label as="a" color="blue500">
        Intro to Union Governance
      </Label>
      <ButtonRow fluid maxw="310px" direction="vertical" mt="24px">
        <Link to="/claim" style={{ width: "100%" }}>
          <Button fluid label="Check elegibility" />
        </Link>
      </ButtonRow>
    </Box>
  );
}
