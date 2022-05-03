import { Paragraph, Strong, Title } from "components/typography";
import { formatter } from "utils";
import { useGlobalStore } from "stores/global";
import Splitter from "components/splitter";
import moment from "moment";

type EarlyLastPayoutViewProps = {
  isHorizontal?: boolean;
};

export function EarlyLastPayoutViewView({
  isHorizontal = false,
}: EarlyLastPayoutViewProps) {
  const transactions = useGlobalStore((state) => state.earlypay.transactions);

  const transaction =
    transactions && transactions.length > 0 ? transactions[0] : null;
  const amount = transaction ? formatter.format(transaction.amount) : "";
  const logo = transaction?.logo || "";
  const employer = transaction?.employer || "";
  const date = transaction
    ? moment(transaction.datetime).format("MMM D")
    : "No payouts yet";

  return (
    <div
      className={
        isHorizontal ? "flex justify-between" : "flex-col"
      }
    >
      <div className="flex items-center">
        {!isHorizontal && (
          <img
            className="mr-4 h-10 w-10 rounded-full"
            src={logo}
            alt={employer || ""}
          />
        )}
        <div>
          <Strong>Last payout</Strong>
          <Paragraph>{date}</Paragraph>
        </div>
      </div>

      <Splitter className="my-2" />
      {isHorizontal ? (
        <Paragraph className="mb-3 !text-black">{amount}</Paragraph>
      ) : (
        <Title className="mb-3">{amount}</Title>
      )}
    </div>
  );
}
