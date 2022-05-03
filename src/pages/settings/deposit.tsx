import type { ReactElement } from "react";
import WithBackButton from "layouts/with-back-button";

import { DepositInfo } from "views/deposit-info";

export default function DepositSettingsPage() {
  return (
    <div className="px-4">
      <DepositInfo />
    </div>
  );
}

DepositSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};
