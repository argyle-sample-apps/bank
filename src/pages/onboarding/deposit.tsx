import type { ReactElement } from "react";
import Link from "next/link";
import WithBackButton from "layouts/with-back-button";

import { Button } from "components/button";
import { DepositInfo } from "views/deposit-info";

export default function DepositPage() {
  return (
    <div className="px-4">
      <DepositInfo />
      <div className="flex">
        <Link href="/onboarding/verify" passHref>
          <Button as="a">Next</Button>
        </Link>
      </div>
    </div>
  );
}

DepositPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};
