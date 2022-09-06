import type { ReactElement } from "react";
import WithBottomNavigation from "layouts/with-bottom-navigation";
import { DecorativeIconWrapper } from "components/decorative-icon-wrapper";
import { IncomeIcon } from "components/icons";
import { Title, Heading, Paragraph } from "components/typography";
import { InlineButton } from "components/button";

export default function IncomeOnboardingPage() {
  return (
    <div className="px-4 pt-4">
      <Title className="mb-7">Income</Title>
      <DecorativeIconWrapper>
        <IncomeIcon />
      </DecorativeIconWrapper>
      <Heading className="mb-3">
        Gain full transparency into how you make money
      </Heading>
      <Paragraph className="mb-6">
        Understand your income distribution by source. See every deduction, tax,
        dollar and cent, and unlock your productivity trends; all by connecting
        your work to GoodBank.
      </Paragraph>
      <div className="flex">
        <InlineButton as="button">Add income</InlineButton>
      </div>
    </div>
  );
}

IncomeOnboardingPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBottomNavigation>{page}</WithBottomNavigation>;
};
