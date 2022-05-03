import type { ReactElement } from "react";
import WithBackButton from "layouts/with-back-button";
import { formatter } from "utils";
import { DecorativeIconWrapper } from "components/decorative-icon-wrapper";
import { CheckIcon } from "components/icons";
import { Heading, Paragraph, Strong } from "components/typography";
import { Button } from "components/button";
import Link from "next/link";
import { useGlobalStore } from "stores/global";

export default function CreditSuccessPage() {
  const creditAmount = useGlobalStore((state) => state.credit.amount) || 0;
  const applyRoute = "/credit";

  return (
    <div className="px-4 pt-4">
      <DecorativeIconWrapper>
        <CheckIcon />
      </DecorativeIconWrapper>
      <Heading className="mb-3">Money received</Heading>
      <Paragraph>
        <Strong>{formatter.format(creditAmount)}</Strong> was added to your
        balance. Monthly loan repayment instalments will be added to your pay
        distribution.
      </Paragraph>
      <div className="mt-4 flex">
        <Link href={applyRoute} passHref>
          <Button as="a">Done</Button>
        </Link>
      </div>
    </div>
  );
}

CreditSuccessPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};
