import type { ReactElement } from "react";
import Link from "next/link";
import WithBackButton from "layouts/with-back-button";

import { Button } from "components/button";
import { ContactInfo } from "views/contact-info";

export default function ContactPage() {
  return (
    <div className="px-4">
      <ContactInfo />
      <div className="flex pt-5">
        <Link href="/onboarding/deposit" passHref>
          <Button as="a">Next</Button>
        </Link>
      </div>
    </div>
  );
}

ContactPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};
