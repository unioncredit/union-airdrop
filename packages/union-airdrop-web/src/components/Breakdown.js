import { Card, Text, Box, Button, Label } from "union-ui";
import { commify } from "@ethersproject/units";

export default function Breakdown({ breakdown, disabled }) {
  return (
    <>
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
      <Button label="Claim tokens" fluid mt="16px" disabled={disabled} />
    </>
  );
}
