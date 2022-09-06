import { ReactElement } from "react";
import Link from "next/link";
import Fullscreen from "layouts/fullscreen";

import { Button } from "components/button";
import { Heading, Paragraph } from "components/typography";
import { DecorativeIconWrapper } from "components/decorative-icon-wrapper";
import { CheckIcon } from "components/icons";
import { useAuth } from "contexts/auth";
import { useRouter } from "next/router";

export default function VerifiedPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleHome = () => {
    login();
    // router.push("home");
  };
  return (
    <div className="px-4 pt-20">
      <DecorativeIconWrapper>
        <CheckIcon />
      </DecorativeIconWrapper>
      <Heading className="mb-3">Membership verified</Heading>
      <Paragraph className="mb-6">
        Your membership has been successfully verified. You are ready to use
        GoodBank.
      </Paragraph>
      <div className="flex">
        <Button onClick={handleHome} as="button">
          Enter profile
        </Button>
      </div>
    </div>
  );
}

VerifiedPage.getLayout = function getLayout(page: ReactElement) {
  return <Fullscreen>{page}</Fullscreen>;
};
