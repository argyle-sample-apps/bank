import { Heading, Paragraph, Strong, Title } from "components/typography";
import { formatter, getDate } from "utils";
import { useGlobalStore } from "stores/global";
import Splitter from "components/splitter";
import moment from "moment";
import clsx from "clsx";
import { useProfile } from "hooks/useProfile";

type EarlyNextPayoutViewProps = {
  isHorizontal?: boolean;
};

function mockDueDate() {
  // const dueDate = getDate(0);
  // dueDate.setDate(1);
  // dueDate.setMonth(dueDate.getMonth() + 1);
  // const dueDateLabel = moment(dueDate).format("MMM DD");
  return "Today";
}

export function EarlyNextPayoutViewView({
  isHorizontal = false,
}: EarlyNextPayoutViewProps) {
  const nextPayout = useGlobalStore((state) => state.earlypay.amount);
  const { profile } = useProfile();

  const dueDateLabel = mockDueDate();

  const employer = profile?.employerC || "";
  const logo = `https://res.cloudinary.com/argyle-media/image/upload/v1600705681/partner-logos/${profile?.employer}.png`;

  return (
    <div
      className={
        isHorizontal ? "flex items-center justify-between" : "flex-col"
      }
    >
      <div className="flex items-center">
        {!isHorizontal && (
          <img
            className="mr-4 h-10 w-10 rounded-full"
            src={logo}
            alt={employer}
          />
        )}
        <div>
          <Strong>Next payout</Strong>
          <Paragraph>{dueDateLabel} (estimated)</Paragraph>
        </div>
      </div>

      <Splitter className="my-2" />
      {isHorizontal ? (
        <Heading className="mb-3, !text-now-green">
          {formatter.format(nextPayout)}
        </Heading>
      ) : (
        <Title className="mb-3">{formatter.format(nextPayout)}</Title>
      )}
    </div>
  );
}
