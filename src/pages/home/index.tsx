import type { ElementType, ReactElement } from "react";
import Link from "next/link";
import WithBottomNavigation from "layouts/with-bottom-navigation";
import {
  AddSmallIcon,
  CardSmallIcon,
  DepositSmallIcon,
  LogotypeIcon,
  RightArrowIcon,
  SendSmallIcon,
} from "components/icons";
import { useProfile } from "hooks/useProfile";
import { Avatar } from "components/avatar";
import {
  Footnote,
  Heading,
  Paragraph,
  Subparagraph,
  Title,
} from "components/typography";
import { InlineButton } from "components/button";
import { useGlobalStore } from "stores/global";
import currency from "currency.js";
import { CreditInfoView } from "views/credit-info";
import { CreditDueView } from "views/credit-due-info";
import Splitter from "components/splitter";
import { EarlyNextPayoutViewView } from "views/early-next-payout";
import { EarlyLastPayoutViewView } from "views/early-last-payout";
import { PaymentCard } from "components/payment-card";
import BalanceView from "views/accounts-balance";
import SavingsView from "views/accounts-savings";
import { CardInfoView } from "views/card-info";
import { useIncome } from "hooks/useIncome";
import { useAccounts } from "hooks/useAccounts";
import { IncomeChart } from "views/income-chart";
import { useUnit } from "hooks/useUnit";
import { useFakeIncome } from "hooks/useFakeIncome";
import { useDepositAccounts } from "hooks/useDepositAccounts";
import { useTransactions } from "hooks/useTransactions";

type BlockProps = {
  header: string;
  text: string;
  button: string;
  icon: ElementType;
  link: string;
  topContent?: ReactElement;
  activeContent?: ReactElement;
  callback?: () => void;
  isActive: boolean;
};

const Block = ({
  header,
  text,
  button,
  icon,
  link,
  callback,
  topContent,
  activeContent,
  isActive,
}: BlockProps) => {
  const Icon = icon;

  if (isActive) {
    return (
      <div className="mb-[64px]">
        <div className="flex items-center justify-between">
          <Heading>{header}</Heading>
          <Link href={link} passHref>
            <InlineButton>
              <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-gray-200">
                <RightArrowIcon />
              </div>
            </InlineButton>
          </Link>
        </div>
        {activeContent}
      </div>
    );
  } else {
    return (
      <div className="mb-[64px]">
        <Heading className="mb-3">{header}</Heading>
        {topContent}
        <Paragraph className="mt-4 mb-5">{text}</Paragraph>
        <div className="flex items-center">
          <Icon />
          <Link href={link} passHref>
            <InlineButton onClick={callback}>
              <Subparagraph className="ml-1 !text-now-purple">
                {button}
              </Subparagraph>
            </InlineButton>
          </Link>
        </div>
      </div>
    );
  }
};

export default function Home() {
  const { profile, isLoading: isProfileLoading } = useProfile();
  const { income, isLoading: isIncomeLoading } = useFakeIncome();
  const { accounts, isLoading: isAccountsLoading } = useAccounts();
  const setAccountsTab = useGlobalStore((state) => state.setAccountsTab);
  const isCardFeature = useGlobalStore((state) => state.card.isActive);
  const isCreditFeature = useGlobalStore((state) => state.credit.isActive);
  const isEarlypayFeature = useGlobalStore((state) => state.earlypay.isActive);

  if (isProfileLoading || isIncomeLoading || isAccountsLoading) {
    return null;
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-10 flex items-center justify-between">
        <div className="w-32">
          <LogotypeIcon />
        </div>
        <Link href="/settings">
          <a>
            <Avatar src={profile.picture_url} />
          </a>
        </Link>
      </div>
      <Block
        header="Income"
        text="Understand how much you make and how much you can make by adding multiple income sources to GoodBank."
        button="Add income"
        icon={AddSmallIcon}
        link="/income"
        isActive={true}
        activeContent={
          <div className="my-4">
            <IncomeChart
              isMinimal
              income={income}
              accounts={accounts}
              selectedMode={0}
            />
          </div>
        }
      />
      <Block
        header="Balance"
        text="Move funds from your income source to GoodBank."
        button="Set up direct deposit"
        icon={DepositSmallIcon}
        link="/accounts"
        topContent={<BalanceView isAmountOnly />}
        activeContent={<BalanceView isMinimal />}
        callback={() => {
          setAccountsTab(0);
        }}
        isActive={true}
      />
      <Block
        header="Card"
        text="Set up a secure debit card with GoodBank."
        button="Create a card"
        icon={CardSmallIcon}
        link="/card"
        isActive={isCardFeature}
        topContent={
          <div className="mt-2 mb-4">
            <PaymentCard mode="logo" size="small" isMinimal />
          </div>
        }
        activeContent={<CardInfoView isMinimal />}
      />
      <Block
        header="Early pay"
        text="Get your money every day after work."
        button="Set up"
        icon={SendSmallIcon}
        link="/early"
        isActive={isEarlypayFeature}
        activeContent={
          <>
            <Splitter className="mt-4 mb-2" />
            <EarlyNextPayoutViewView isHorizontal />
            <Splitter className="my-2" />
            <EarlyLastPayoutViewView isHorizontal />
            <Splitter className="mt-2" />
          </>
        }
      />
      <Block
        header="Savings"
        text="Set money aside for a rainy day, a nice vacation, or an expensive purchase."
        button="Add"
        icon={AddSmallIcon}
        link="/accounts"
        topContent={<SavingsView isAmountOnly />}
        activeContent={<SavingsView isMinimal />}
        callback={() => {
          setAccountsTab(1);
        }}
        isActive={true}
      />
      <Block
        header="Credit"
        text="Get a loan based on your income and work history."
        button="Apply for a loan"
        icon={SendSmallIcon}
        link="/credit"
        isActive={isCreditFeature}
        activeContent={
          <>
            <CreditInfoView isDark />
            <Splitter className="mt-4 mb-1" />
            <CreditDueView isHorizontal />
            <Splitter className="mt-2 mb-4" />
            <Link href={"/credit"} passHref>
              <InlineButton>
                <Paragraph className="!text-now-darkorange">
                  Get new credit
                </Paragraph>
              </InlineButton>
            </Link>
          </>
        }
      />
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <WithBottomNavigation>{page}</WithBottomNavigation>;
};
