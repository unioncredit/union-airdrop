import { Link } from "react-router-dom";
import { ButtonRow, Button, Box, Heading, Text, Label } from "union-ui";
import { ReactComponent as RightArrow } from "union-ui/lib/icons/arrowRight.svg";

export default function Home() {
  return (
    <Box direction="vertical" align="center" justify="center" mt="40px">
      <video width="80px" autoPlay loop muted controls={false}>
        <source src="/token_400.mp4" type="video/mp4" />
      </video>
      <Heading align="center" mt="24px">
        Define the future of Union
      </Heading>
      <Text align="center" grey={400}>
        $UNION is voting power and voice for the Union protocol. Tokens are
        claimable by early participants in Union’s public tests.
      </Text>
      <Box align="center" justify="center" className="governanceLink">
        <Label as="a" color="blue500" m={0}>
          Intro to Union Governance
        </Label>
        <RightArrow width="24px" />
      </Box>
      <ButtonRow fluid maxw="310px" direction="vertical" mt="24px">
        <Link to="/claim" style={{ width: "100%" }}>
          <Button fluid label="Check elegibility" />
        </Link>
      </ButtonRow>
    </Box>
  );
}
