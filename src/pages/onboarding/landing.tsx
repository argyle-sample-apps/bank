import type { ReactElement } from "react";
import Link from "next/link";
import Fullscreen from "layouts/fullscreen";

import { Button, InlineButton } from "components/button";
import { Heading, Paragraph } from "components/typography";
import { LogoIcon } from "components/icons";

export default function LandingPage() {
  return (
    <div className="brand-gradient flex h-full items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="mb-10 h-24 w-24">
          <LogoIcon />
        </div>
        <div className="mb-10 max-w-[220px] text-center">
          <Heading>The Financial App for Right Now</Heading>
        </div>
        <Link href="/onboarding/connect" passHref>
          <Button as="a">Become a member</Button>
        </Link>
        <Link href="/onboarding/signin" passHref>
          <InlineButton as="a" className="mt-4">
            <Paragraph className="!text-now-dark">Sign in</Paragraph>
          </InlineButton>
        </Link>
      </div>
    </div>
  );
}

LandingPage.getLayout = function getLayout(page: ReactElement) {
  return <Fullscreen>{page}</Fullscreen>;
};
