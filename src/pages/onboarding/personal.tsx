import type { ReactElement } from "react";
import Link from "next/link";
import WithBackButton from "layouts/with-back-button";

import { Button } from "components/button";
import { PersonalInfo } from "views/personal-info";

export default function PersonalPage() {
  return (
    <div className="px-4">
      <PersonalInfo />
      <div className="flex pt-5">
        <Link href="/onboarding/contact" passHref>
          <Button as="a">Next</Button>
        </Link>
      </div>
    </div>
  );
}

PersonalPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};
