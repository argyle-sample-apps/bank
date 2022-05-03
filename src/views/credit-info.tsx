import { Paragraph, Strong } from "components/typography";
import { formatter } from "utils";
import { useGlobalStore } from "stores/global";
import currency from "currency.js";

type CreditInfoViewProps = {
  isDark?: boolean;
};

export function CreditInfoView({ isDark = false }: CreditInfoViewProps) {
  const amount = useGlobalStore((state) => state.credit.amount) || 0;
  const interest = useGlobalStore((state) => state.credit.interest) || 0;

  const color = isDark ? "!text-black-600" : "!text-now-purple";

  return (
    <>
      <Paragraph>
        Loan of <Strong className={color}>{currency(amount, { fromCents: true }).format()}</Strong>{" "}
        with <Strong className={color}>{interest}%</Strong>
      </Paragraph>
    </>
  );
}
