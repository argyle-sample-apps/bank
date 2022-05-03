import type { ReactElement } from "react";
import Link from "next/link";
import Fullscreen from "layouts/fullscreen";

import { Button } from "components/button";
import { Heading, Paragraph, Strong } from "components/typography";
import { UserAvatarCircles } from "components/user-avatar-circles";
import { formatSnakeCase } from "utils";
import { useProfile } from "hooks/useProfile";
import { useAccounts } from "hooks/useAccounts";

export default function WelcomePage() {
  const { profile, isLoading: isProfileLoading } = useProfile();
  const { accounts, isLoading: isAccountsLoading } = useAccounts();

  if (isAccountsLoading || isProfileLoading) {
    return (
      <div className="mt-96 grid animate-pulse gap-3 px-4">
        <div className="h-7 w-20 rounded-full bg-gray-200"></div>
        <div className="h-4 w-full rounded-full bg-gray-200"></div>
        <div className="h-4 w-4/6 rounded-full bg-gray-200"></div>
        <div className="h-4 w-5/6 rounded-full bg-gray-200"></div>
        <div className="h-10 w-3/6 rounded-full bg-gray-200"></div>
      </div>
    );
  }

  const linkItems = accounts.map((account: any) => account.link_item);
  const employerImages = linkItems.map(
    (linkItem: string) =>
      `https://res.cloudinary.com/argyle-media/image/upload/v1600705681/partner-logos/${linkItem}.png`
  );

  function formatEmployerNames(linkItems: string[]) {
    let phrase = "";

    linkItems.forEach((item, index) => {
      const formatted = formatSnakeCase(item);

      if (index === 0) {
        phrase += formatted;
      } else if (index === linkItems.length - 1) {
        phrase += ` and ${formatted}`;
      } else {
        phrase += `, ${formatted}`;
      }
    });

    return phrase;
  }

  const emplyersPhrase = formatEmployerNames(linkItems);

  return (
    <>
      <UserAvatarCircles
        href={profile.picture_url}
        employerImages={employerImages}
      />
      <div className="px-4 pt-[20px] pr-[92px]">
        <Heading className="mb-3">Hi {profile.first_name}</Heading>
        <Paragraph className="mb-6">
          We were able to input your work at <Strong>{emplyersPhrase}</Strong>{" "}
          this month. The next step is to confirm that your account information
          is correct.
        </Paragraph>
        <div className="flex">
          <Link href="/onboarding/personal" passHref>
            <Button as="a">Review your profile</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

WelcomePage.getLayout = function getLayout(page: ReactElement) {
  return <Fullscreen>{page}</Fullscreen>;
};
