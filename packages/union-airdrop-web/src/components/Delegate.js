import { useState } from "react";
import { Box, Label, Card, Control, Collapse, Input, Button } from "union-ui";

const DelegateType = {
  SELF: "self",
  ADDRESS: "address",
};

const options = [
  {
    title: "Delegate to self",
    content:
      "Delegate your votes to yourself so that you can vote manually on Union improvement proposals.",
    type: DelegateType.SELF,
  },
  {
    title: "Delegate to an address",
    content: (
      <>
        <Label>
          Delegate your votes to an Ethereum address who’s likely to vote on
          your behalf
        </Label>
        <Box fluid mt="12px">
          <Input name="address" placeholder="0x000...000" />
        </Box>
      </>
    ),
    type: DelegateType.ADDRESS,
  },
];

export default function Delegate() {
  const [delegateType, setDelegateType] = useState(DelegateType.SELF);

  const handleSelectOption = (option) => {
    setDelegateType(option.type);
  };

  return (
    <>
      {options.map((option) => {
        const selected = option.type === delegateType;

        return (
          <Card
            key={option.paymentType}
            variant={selected ? "blue" : "primary"}
            bordered={selected}
            packed
            mt="8px"
          >
            <Card.Body>
              <Box justify="space-between">
                <Box direction="vertical">
                  <Control
                    onClick={() => handleSelectOption(option)}
                    label={option.title}
                    type="radio"
                    checked={selected}
                  />
                  <Collapse active={selected}>
                    {typeof option.content === "string" ? (
                      <Label as="p" mt="4px" mb={0}>
                        {option.content}
                      </Label>
                    ) : (
                      option.content
                    )}
                  </Collapse>
                </Box>
              </Box>
            </Card.Body>
          </Card>
        );
      })}

      <Button mt="8px" fluid label="Delegate votes" />
    </>
  );
}
