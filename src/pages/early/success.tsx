import type { ReactElement } from "react";
import WithBackButton from "layouts/with-back-button";
import { formatter } from "utils";
import { DecorativeIconWrapper } from "components/decorative-icon-wrapper";
import { CheckIcon } from "components/icons";
import { Heading, Paragraph, Strong } from "components/typography";
import { Button } from "components/button";
import Link from "next/link";
import { useGlobalStore } from "stores/global";
import { usePayouts } from "hooks/usePayouts";

export default function EarlyPaySuccessPage() {
  const earlyPayAmount = useGlobalStore((state) => state.earlypay.amount) || 0;
  const { lastPayoutAmount, isLoading } = usePayouts();
  const applyRoute = "/early";

  return (
    <div className="px-4 pt-4">
      <DecorativeIconWrapper>
        <CheckIcon />
      </DecorativeIconWrapper>
      <Heading className="mb-3">Success</Heading>
      <Paragraph>
        FinanceNow will deposit{" "}
        <Strong>{formatter.format(earlyPayAmount)}</Strong> to your account.
        This is based on your last paycheck of{" "}
        <Strong>{formatter.format(lastPayoutAmount)}</Strong>.
      </Paragraph>
      <div className="mt-4 flex">
        <Link href={applyRoute} passHref>
          <Button as="a">Done</Button>
        </Link>
      </div>
    </div>
  );
}

EarlyPaySuccessPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};
