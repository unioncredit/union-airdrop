import { Box, Heading, Text, Card, Label } from "union-ui";

export default function GeoBlock() {
  return (
    <Box direction="vertical" align="center" justify="center" fluid>
      <Heading align="center" size="xlarge">
        Not available in United States
      </Heading>
      <Text align="center" grey={400}>
        Union’s token distribution is not available for users based in the
        United States
      </Text>
      <Card mt="24px">
        <Card.Body>
          <Box justify="center" mb="8px">
            <img src="/us.png" alt="geo-block-us" width="105px" />
          </Box>
          <Heading align="center">Give crypto a home in the U.S.</Heading>
          <Label as="p" align="center" grey={400}>
            HODLpac is a political action committee aiming to make sure the
            cryptoeconomy has a home within the United States
          </Label>
          <Label as="p" align="center" color="blue500">
            Learn more about HODLpac
          </Label>
        </Card.Body>
      </Card>
    </Box>
  );
}
