import { Text, Box } from "union-ui";
import { ReactComponent as Check } from "union-ui/lib/icons/wireCheck.svg";
import { commify } from "@ethersproject/units";

export default function Claimed({ tokens }) {
  return (
    <Box align="center" justify="center" className="claimedText" mt="24px">
      <Check width="24px" />
      <Text color="green500" align="center" m={0}>
        Claimed {commify(tokens)} UNION
      </Text>
    </Box>
  );
}
