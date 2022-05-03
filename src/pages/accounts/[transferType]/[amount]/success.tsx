import type { ReactElement } from "react";
import WithCloseButton from "layouts/with-close-button";

import { Button } from "components/button";
import { Heading, Paragraph } from "components/typography";

import Link from "next/link";
import { DecorativeIconWrapper } from "components/decorative-icon-wrapper";
import { CheckIcon } from "components/icons";
import { useRouter } from "next/router";
import currency from "currency.js";
import {
  TransferTypes,
  AccountsScreenTypes,
  transferTranslation,
} from "utils/accounts";

const applyRoute = "/accounts";

export default function AccountsTransferPage() {
  const router = useRouter();
  const params = router.query;
  const amount = params.amount;
  const transferType = Number(params.transferType) as TransferTypes;

  const translations = transferTranslation(
    AccountsScreenTypes.Success,
    transferType
  );

  return (
    <div className="px-4">
      <DecorativeIconWrapper>
        <CheckIcon />
      </DecorativeIconWrapper>
      <Heading className="mb-3">Success</Heading>
      <Paragraph className="mb-6">
        {currency(Number(amount), { fromCents: true }).format()} has been moved{" "}
        {translations.text}.
      </Paragraph>
      <Link href={applyRoute} passHref>
        <Button>Done</Button>
      </Link>
    </div>
  );
}

AccountsTransferPage.getLayout = function getLayout(page: ReactElement) {
  return <WithCloseButton closeRoute={applyRoute}>{page}</WithCloseButton>;
};
