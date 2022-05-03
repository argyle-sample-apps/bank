import type { ReactElement } from "react";
import Link from "next/link";
import WithBackButton from "layouts/with-back-button";

import { Button } from "components/button";
import { Heading, Paragraph, Strong } from "components/typography";
import { useProfile } from "hooks/useProfile";
import { formatAddress } from "utils";

export default function CardDeliveryPage() {
  const { profile, isLoading } = useProfile();
  const applyRoute = "/card/success";

  if (isLoading) {
    return (
      <div className="grid animate-pulse gap-10 px-4">
        {[1, 2].map((el) => (
          <div key={el}>
            <div className="mb-2 h-3 w-20 rounded-full bg-gray-200"></div>
            <div className="h-4 w-32 rounded-full bg-gray-200"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="px-4">
      <Heading className="mb-3">Delivery address</Heading>
      <Paragraph className="mb-3">
        <Strong>{profile.full_name}</Strong>
        <span className="block">{formatAddress(profile.address)}</span>
        <span className="block">{profile.phone_number}</span>
      </Paragraph>
      <div className="flex">
        <Link href={applyRoute} passHref>
          <Button as="a">Next</Button>
        </Link>
      </div>
    </div>
  );
}

CardDeliveryPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};
