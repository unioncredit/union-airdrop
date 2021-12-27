import { ethers } from "ethers";
import { useState } from "react";
import { commify } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { Card, Text, Box, Button, Label } from "union-ui";

import useClaim from "../hooks/useClaim";
import useAddNotification from "../hooks/useAddNotification";

export default function Breakdown({ breakdown, disabled, merkleTree, tokens }) {
  const { account } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const claim = useClaim();
  const addNotification = useAddNotification();

  const amount = tokens;

  const leaf = ethers.utils.solidityKeccak256(
    ["address", "uint256"],
    [account, amount]
  );

  const proof = merkleTree.getHexProof(leaf);

  const handleClaim = async () => {
    const clear = addNotification("Pending claim", { type: "pending" });
    setLoading(true);

    try {
      const tx = await claim(proof, amount.toString());
      await tx.wait();
      addNotification("Claim successfull");
    } catch (error) {
      console.log(error);
      addNotification("Claim failed", { type: "error" });
    } finally {
      setLoading(false);
      clear();
    }
  };

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
      <Button
        label="Claim tokens"
        fluid
        mt="16px"
        loading={loading}
        disabled={disabled}
        onClick={handleClaim}
      />
    </>
  );
}
