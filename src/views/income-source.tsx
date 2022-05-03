import { Heading, Paragraph } from "components/typography";
import currency from "currency.js";
import { formatSnakeCase } from "utils";

type MonthData = any;

function getPercentOf(a: number, b: number) {
  return (a / b) * 100;
}

function getIncomeBySource(months: MonthData[], accounts: any) {
  const sources = accounts.reduce(
    (acc: any, val: any) => ({
      ...acc,
      [val["link_item"]]: {
        color: val.color,
        value: 0,
      },
    }),
    {}
  ) as any;

  months.forEach((month) => {
    if (month.data.length) {
      month.data.forEach(({ link_item, gross_pay }: any) => {
        if (sources[link_item]) {
          sources[link_item].value += Number(gross_pay);
        }
      });
    }
  });

  const sourcesArray = Object.keys(sources).map((key) => ({
    label: formatSnakeCase(key),
    data: sources[key],
  }));

  const total = sourcesArray.reduce((acc, val) => acc + val.data.value, 0);

  return sourcesArray.map((source) => ({
    ...source,
    percentage: getPercentOf(source.data.value, total),
  }));
}

export const IncomeSource = ({ income, accounts }: any) => {
  const sources = getIncomeBySource(income.monthly, accounts);

  return (
    <div>
      <Heading className="mb-3">By income source</Heading>
      {sources.map((source, index) => {
        return (
          <div key={source.label} className="mb-4">
            <div className="mt-2 flex">
              <Paragraph className="mb-2 !text-now-darkest">
                {source.label}
              </Paragraph>
              <Paragraph className="ml-3">
                {currency(source.data.value).format()}
              </Paragraph>
            </div>
            <div
              className="h-1.5 rounded-full"
              style={{
                backgroundColor: source.data.color,
                width: `${source.percentage}%`,
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};
