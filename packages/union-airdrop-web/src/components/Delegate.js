import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { useForm } from "react-hook-form";
import { Box, Label, Card, Control, Collapse, Input, Button } from "union-ui";
import { isAddress } from "ethers/lib/utils";
import useDelegate from "../hooks/useDelegate";
import useAddNotification from "../hooks/useAddNotification";
import useVotingWallet from "../hooks/useVotingWallet";

const DelegateType = {
  SELF: "self",
  ADDRESS: "address",
};

export default function Delegate() {
  const { account } = useWeb3React();
  const [delegateType, setDelegateType] = useState(DelegateType.SELF);
  const delegate = useDelegate();
  const addNotification = useAddNotification();
  const { mutate: updateDelegate } = useVotingWallet();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", reValidateMode: "onChange" });

  const handleSelectOption = (option) => {
    setDelegateType(option.type);
    const value = option.type === DelegateType.SELF ? account : null;
    const revalidate = option.type === Delegate.SELF;
    setValue("address", value, {
      shouldValidate: revalidate,
      shouldDirty: revalidate,
    });
  };

  const handleDelegate = async (values) => {
    const address = values.address;
    const clear = addNotification("Pending delegation", { type: "pending" });
    try {
      const tx = await delegate(address);
      await tx.wait();
      addNotification("Successfully delegated");
    } catch (error) {
      addNotification("Delegation failed", { type: "error" });
    } finally {
      await updateDelegate();
      clear();
    }
  };

  const validate = (value) => {
    if (!value) return "Please provide an address value";
    if (!isAddress(value)) return "Invalid address";
    return true;
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
            <Input
              {...register("address", { validate })}
              error={errors?.address?.message}
              placeholder="0x000...000"
            />
          </Box>
        </>
      ),
      type: DelegateType.ADDRESS,
    },
  ];

  useEffect(() => {
    account && setValue("address", account);
  }, [account, setValue]);

  return (
    <form onSubmit={handleSubmit(handleDelegate)}>
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

      <Button type="submit" mt="8px" fluid label="Delegate votes" />
    </form>
  );
}
