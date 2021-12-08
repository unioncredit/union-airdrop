import { useWeb3React } from "@web3-react/core";
import { Card, Heading, Label, Button } from "union-ui";

export default function ClaimCard() {
  const { account } = useWeb3React();

  return (
    <Card>
      <Card.Body>
        <Heading
          size="xlarge"
          weight="medium"
          mb="8px"
          align="center"
          grey={800}
        >
          Claim your UNION
        </Heading>
        <Label as="p" align="center" mb="16px" grey={700}>
          Claimable by all addresses who became members of Union before 22nd
          November 2021 00:00 UTC
        </Label>

        {!account ? (
          <Button fluid label="Connect Wallet" />
        ) : (
          <Button label="Claim" fluid />
        )}
      </Card.Body>
    </Card>
  );
}
