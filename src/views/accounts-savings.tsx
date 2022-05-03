import {
  Title,
  Heading,
  Paragraph,
  Footnote,
  Strong,
  Subparagraph,
  Subheading,
  Megatitle,
} from "components/typography";
import { Table, TableRowProps, TableSectionProps } from "components/table";
import { useGlobalStore } from "stores/global";
import { useProfile } from "hooks/useProfile";
import { useRouter } from "next/router";

import { InlineButton } from "components/button";
import { AddIcon, WithdrawIcon } from "components/icons";
import { getInitials } from "utils";
import { unitTransactionsToSections, TransferTypes } from "utils/accounts";
import Link from "next/link";
import currency from "currency.js";
import clsx from "clsx";
import { useTransactions } from "hooks/useTransactions";
import { useUnit } from "hooks/useUnit";

type SavingsViewProps = {
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
export default function SavingsView({
  isAmountOnly,
  isMinimal,
}: SavingsViewProps) {
  const { unit } = useUnit();
  const savings = currency(unit?.savingsAccount.attributes.balance, {
    fromCents: true,
  });
  const { transactions: transactionsRaw } = useTransactions(
    unit?.savingsAccount.id
  );
  const transactions = fromUnit(transactionsRaw || []);

  const applyRoute = "/accounts/TYPE/transfer";
  const router = useRouter();

  const { profile, isLoading } = useProfile();

  let sections = unitTransactionsToSections(transactions, "savings");
  if (isMinimal && sections && sections[0] && sections[0].rows.length > 0) {
    const section = sections[0];
    section.rows = [section.rows[0]];
    sections = [section];
  }

  function handleAdd() {
    router.push(applyRoute.replace("TYPE", "" + TransferTypes.addSavings));
  }

  function handleWithdraw() {
    router.push(applyRoute.replace("TYPE", "" + TransferTypes.withdrawSavings));
  }

  if (isAmountOnly) {
    return <Title>{savings.format()}</Title>;
  }

  const savingsFormatted = savings.format();
  const precisionSplit = savingsFormatted.split(".");

  const ButtonElement = isMinimal ? Subparagraph : Subheading;
  return (
    <div className="pt-4">
      <div className="mb-3 flex items-end">
        <Megatitle>{precisionSplit[0]}</Megatitle>
        <Paragraph className="!text-2xl !text-black">
          .{precisionSplit[1]}
        </Paragraph>
      </div>
      {!isMinimal && (
        <div className="mb-3 flex">
          <Footnote>US Dollars</Footnote>
        </div>
      )}
      <div className={clsx("flex", !isMinimal && "pb-[64px]")}>
        <InlineButton onClick={handleAdd} className="flex items-center pr-5">
          <AddIcon />
          <ButtonElement className="pl-1 !text-now-purple">Add</ButtonElement>
        </InlineButton>
        <InlineButton onClick={handleWithdraw} className="flex items-center">
          <WithdrawIcon />
          <ButtonElement className="pl-1 !text-now-orange">
            Withdraw
          </ButtonElement>
        </InlineButton>
      </div>
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
  );
}
