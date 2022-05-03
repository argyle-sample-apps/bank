import { useEffect } from "react";
import { Footnote, Heading, Paragraph, Title } from "components/typography";
import { Modal } from "components/modal";
import { PaymentCard } from "components/payment-card";
import { useUnit } from "hooks/useUnit";
import { InlineButton } from "components/button";

type AccountDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AccountDetails({ isOpen, onClose }: AccountDetailsProps) {
  const { unit } = useUnit();

  if (!unit) {
    return null;
  }

  const { address } = unit?.customer.attributes;
  const { accountNumber, routingNumber, name } =
    unit?.checkingAccount.attributes;

  const formattedAddress = `${address.street}, ${address.city} ${address.state} ${address.postalCode}, ${address.country}`;

  const rows = [
    {
      label: "Account holder",
      value: name,
    },
    {
      label: "Routing number",
      value: routingNumber,
    },
    {
      label: "Account number",
      value: accountNumber,
    },
    {
      label: "Address",
      value: formattedAddress,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="z-10 bg-white">
      <Heading className="px-4">My USD account details</Heading>
      <div className="mt-10">
        {rows.map((row) => (
          <div
            key={row.label}
            className="group flex items-center justify-between px-4 py-3 hover:bg-[#DBDCDD] hover:bg-opacity-20"
          >
            <div>
              <Footnote>{row.label}</Footnote>
              <Paragraph className="max-w-[200px] !text-now-darkest">
                {row.value}
              </Paragraph>
            </div>
            <InlineButton
              className="invisible !text-[14px] !text-now-purple group-hover:visible"
              onClick={() => {
                navigator.clipboard.writeText(row.value);
              }}
            >
              copy
            </InlineButton>
          </div>
        ))}
      </div>
    </Modal>
  );
}
