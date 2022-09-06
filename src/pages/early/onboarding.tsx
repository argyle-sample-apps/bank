import { DecorativeIconWrapper } from "components/decorative-icon-wrapper";
import { EarlyPayIcon } from "components/icons";
import { Title, Heading, Paragraph } from "components/typography";
import { Button } from "components/button";
import "rc-slider/assets/index.css";
import Link from "next/link";
import { useIncome } from "hooks/useIncome";
import { useFakeIncome } from "hooks/useFakeIncome";

export default function EarlyPayOnboardingPage() {
  const { income, isLoading } = useFakeIncome();
  const applyRoute = "early/confirm";

  if (isLoading) {
    return (
      <div className="mt-8 grid animate-pulse gap-3 px-4">
        <div className="h-10 w-32 rounded-full bg-gray-200"></div>
        <div className="h-4 w-full rounded-full bg-gray-200"></div>
        <div className="h-4 w-4/6 rounded-full bg-gray-200"></div>
        <div className="h-4 w-5/6 rounded-full bg-gray-200"></div>
        <div className="h-10 w-3/6 rounded-full bg-gray-200"></div>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 pt-4">
        <Title className="mb-7">Early Pay</Title>
        <DecorativeIconWrapper>
          <EarlyPayIcon />
        </DecorativeIconWrapper>
        <Heading className="mb-3">
          Get 70% of your income as soon as you earn it
        </Heading>
        <Paragraph className="mb-3">
          Don’t wait weeks or months for your paycheck. Deposit the bulk of your
          income to your GoodBank debit card and use your hard earned cash
          right away.
        </Paragraph>
        <div className="mt-4 flex">
          <Link href={applyRoute} passHref>
            <Button as="button">Set up early pay</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
