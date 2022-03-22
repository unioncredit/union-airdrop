import { useLocation } from "react-router-dom";
import { Box, Heading, Text, Card, Label } from "union-ui";

export default function GeoBlock() {
  const props = useLocation();

  const countryCode = props.search
    .replace("?", "")
    .split("&")
    .map((x) => x.split("="))
    .find((x) => x[0] === "country")?.[1];

  const isUS = countryCode.toLowerCase() === "us";

  const heading = isUS
    ? "Not available in United States"
    : "Not available in your location";

  const description = isUS
    ? "This UI is not available for users based in your region"
    : "Union’s token distribution is not available for users based in Belarus, Ivory Coast, Cuba, Congo, Iran, Iraq, Liberia, Myanmar, North Korea, Sudan, South Sudan, Syria, Zimbabwe.";

  return (
    <Box direction="vertical" align="center" justify="center" fluid>
      <Heading align="center" size="xlarge">
        {heading}
      </Heading>
      <Text align="center" grey={400}>
        {description}
      </Text>
      {isUS && (
        <Card mt="24px">
          <Card.Body>
            <Box justify="center" mb="8px">
              <img src="/coin-center.png" alt="geo-block-us" width="105px" />
            </Box>
            <Heading align="center">Donate to Coin Center</Heading>
            <Label as="p" align="center" grey={400}>
              Coin Center is the leading non-profit research and advocacy center
              focused on the public policy issues facing cryptocurrency and
              decentralized computing technologies like Bitcoin and Ethereum
            </Label>
            <Box justify="center">
              <Label
                as="a"
                href="https://www.coincenter.org/"
                rel="norefferer"
                target="_blank"
                align="center"
                color="blue500"
              >
                Learn more about Coin Center {"->"}
              </Label>
            </Box>
          </Card.Body>
        </Card>
      )}
    </Box>
  );
}
