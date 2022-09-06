import type { ReactElement } from "react";
import Link from "next/link";
import WithBackButton from "layouts/with-back-button";

import { Button } from "components/button";
import { Heading, Paragraph } from "components/typography";
import { DecorativeIconWrapper } from "components/decorative-icon-wrapper";
import { CheckIcon } from "components/icons";

export default function CardSuccessPage() {
  const applyRoute = "/card/top-up";

  return (
    <div className="px-4">
      <DecorativeIconWrapper>
        <CheckIcon />
      </DecorativeIconWrapper>
      <Heading className="mb-3">Your card is on its way</Heading>
      <Paragraph className="mb-6">
        Your GoodBank physical card is being produced and sent to you. The virtual
        copy of the card is already available for online purchases and Apple
        Pay.
      </Paragraph>
      <div className="flex">
        <Link href={applyRoute} passHref>
          <Button as="a">Top up</Button>
        </Link>
      </div>
    </div>
  );
}

CardSuccessPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};
