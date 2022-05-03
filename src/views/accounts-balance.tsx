import { useState } from "react";
import currency from "currency.js";
import clsx from "clsx";
import Link from "next/link";
import {
  Heading,
  Paragraph,
  Footnote,
  Subparagraph,
  Subheading,
  Megatitle,
} from "components/typography";
import { Table } from "components/table";
import { getInitials } from "utils";
import { unitTransactionsToSections } from "utils/accounts";
import { InlineButton } from "components/button";
import { AddIcon, SendIcon } from "components/icons";
import { useUnit } from "hooks/useUnit";
import { useTransactions } from "hooks/useTransactions";
import { AccountDetails } from "./account-details";
import { getRandomInt, getRandomName } from "utils";

type BalanceViewProps = {
  isAmountOnly?: boolean;
  isMinimal?: boolean;
};

function fromUnit(transactions: any) {
  return transactions.map((transaction: any) => ({
    id: transaction.id,
    datetime: transaction.attributes.createdAt,
    employer:
      transaction.attributes.description || transaction.attributes.summary,
    initials: getInitials(
      transaction.attributes.description || transaction.attributes.summary
    ),
    amount: transaction.attributes.amount,
    type: transaction.type,
    purpose: transaction.attributes.tags?.purpose,
  }));
}

export default function BalanceView({
  isAmountOnly,
  isMinimal,
}: BalanceViewProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { unit, mutate: unitMutate } = useUnit();

  const balance = currency(unit?.checkingAccount.attributes.balance, {
    fromCents: true,
  });

  const { transactions: transactionsBalanceRaw, mutate: transactionsMutate } =
    useTransactions(unit?.checkingAccount?.id);

  const transactionsBalance = fromUnit(transactionsBalanceRaw || []);

  let sections = unitTransactionsToSections(transactionsBalance, "checking");

  if (isMinimal && sections && sections[0] && sections[0].rows.length > 0) {
    const section = sections[0];
    section.rows = [section.rows[0]];
    sections = [section];
  }

  const onAddBalanceIncome = () => {
    const name = getRandomName();
    const amount = getRandomInt(30000);

    const url = "api/unit/transactions/incoming";
    const config = {
      amount: amount,
      description: name,
      unitAccountId: unit?.checkingAccount.id,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(config),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        unitMutate();
        transactionsMutate();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSendMoney = () => {
    const name = getRandomName();
    const amount = getRandomInt(balance.intValue / 10);

    const url = "api/unit/transactions/outgoing";
    const config = {
      amount: amount,
      description: name,
      unitAccountId: unit?.checkingAccount.id,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(config),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        unitMutate();
        transactionsMutate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isAmountOnly) {
    return <Megatitle>{balance.format()}</Megatitle>;
  }

  const balanceFormatted = balance.format();
  const precisionSplit = balanceFormatted.split(".");

  const ButtonElement = isMinimal ? Subparagraph : Subheading;

  return (
    <>
      <AccountDetails
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
      <div className="pt-4">
        <div className="mb-3 flex items-end">
          <Megatitle>{precisionSplit[0]}</Megatitle>
          <Paragraph className="!text-2xl !text-black">
            .{precisionSplit[1]}
          </Paragraph>
        </div>
        {!isMinimal && (
          <div className="mb-7 flex">
            <Footnote>US Dollars</Footnote>
            <InlineButton onClick={() => setDetailsOpen(true)}>
              <Footnote className="px-4 !text-now-darkorange">
                Account details
              </Footnote>
            </InlineButton>
          </div>
        )}
        {!isMinimal && (
          <div className={clsx("flex", !isMinimal && "pb-[64px]")}>
            <InlineButton
              className="flex items-center pr-5"
              onClick={onAddBalanceIncome}
            >
              <AddIcon />
              <ButtonElement className="pl-1 !text-now-purple">
                Receive
              </ButtonElement>
            </InlineButton>
            <InlineButton className="flex items-center" onClick={onSendMoney}>
              <SendIcon />
              <ButtonElement className="pl-1 !text-now-purple">
                Send
              </ButtonElement>
            </InlineButton>
          </div>
        )}
        {!isMinimal && <Heading className="mb-3">Transactions</Heading>}
        <Table sections={sections} isMinimal={isMinimal} />
        {isMinimal && (
          <Link href={"/accounts"} passHref>
            <InlineButton className="flex items-center pt-4">
              <Subparagraph className="pl-1 !text-now-darkorange">
                All transactions
              </Subparagraph>
            </InlineButton>
          </Link>
        )}
      </div>
    </>
  );
}
