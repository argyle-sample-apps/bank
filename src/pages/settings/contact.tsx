import type { ReactElement } from "react";
import WithBackButton from "layouts/with-back-button";

import { ContactInfo } from "views/contact-info";

export default function ContactSettingsPage() {
  return (
    <div className="px-4">
      <ContactInfo />
    </div>
  );
}

ContactSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};
