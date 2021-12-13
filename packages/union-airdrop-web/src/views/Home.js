import { ButtonRow, Button, Box, Heading, Text, Label } from "union-ui";

export default function Home() {
  return (
    <Box direction="vertical" align="center" justify="center">
      <Heading align="center">UNION Governance Token</Heading>
      <Text align="center" grey={400}>
        $UNION is voting power and voice for the Union protocol. Tokens are
        claimable by early participants of Union’s protocol.
      </Text>
      <Label as="a" color="blue500">
        Intro to Union Governance
      </Label>
      <ButtonRow fluid maxw="310px" direction="vertical" mt="24px">
        <Button fluid label="Check elegibility" />
      </ButtonRow>
    </Box>
  );
}
