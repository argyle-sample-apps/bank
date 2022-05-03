import { Paragraph, Strong, Title } from "components/typography";
import { formatter, getDate } from "utils";
import { useGlobalStore } from "stores/global";
import Splitter from "components/splitter";
import moment from "moment";
import clsx from "clsx";
import currency from "currency.js";

type CreditDueViewProps = {
  isHorizontal?: boolean;
};

function mockDueDate() {
  const dueDate = getDate(0);
  dueDate.setDate(1);
  dueDate.setMonth(dueDate.getMonth() + 1);
  const dueDateLabel = moment(dueDate).format("MMM DD");
  return dueDateLabel;
}

export function CreditDueView({ isHorizontal = false }: CreditDueViewProps) {
  const amount = useGlobalStore((state) => state.credit.amount) || 0;

  const amountDue = amount / 12;
  const dueDateLabel = mockDueDate();

  return (
    <div>
      <div
        className={clsx("justify-between", isHorizontal ? "flex" : "flex-col")}
      >
        <div className="flex-col">
          <Strong>Amount due</Strong>
          <Paragraph>{dueDateLabel}</Paragraph>
        </div>
        <Splitter className="my-2" />
        <Title className={clsx(isHorizontal ? "text-now-orange" : "mb-3")}>
          {currency(amountDue, { fromCents: true }).format()}
        </Title>
      </div>
    </div>
  );
}
