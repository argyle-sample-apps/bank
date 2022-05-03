import type { ReactElement } from "react";
import Link from "next/link";
import Fullscreen from "layouts/fullscreen";

import { Button } from "components/button";
import { Heading } from "components/typography";

export default function Index() {
  return (
    <div className="brand-gradient flex h-full items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="mb-10">
          <div>logo</div>
        </div>
        <div className="mb-10 max-w-[180px] text-center">
          <Heading>Financial app of the now</Heading>
        </div>
        <Link href="/home" passHref>
          <Button as="a">Become a member</Button>
        </Link>
      </div>
    </div>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <Fullscreen>{page}</Fullscreen>;
};
