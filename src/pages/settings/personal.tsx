import type { ReactElement } from "react";
import WithBackButton from "layouts/with-back-button";

import { PersonalInfo } from "views/personal-info";

export default function PersonalSettingsPage() {
  return (
    <div className="px-4">
      <PersonalInfo />
    </div>
  );
}

PersonalSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};
