import { Cell, ResponsiveContainer, PieChart, Pie } from "recharts";
import { Heading, Paragraph, Subparagraph } from "components/typography";
import currency from "currency.js";

type RowProps = {
  label: string;
  value: number;
  color: string;
};

function Row({ label, value, color }: RowProps) {
  return (
    <div className="flex items-center justify-between">
      <Subparagraph className="flex-1 !text-now-darkest">{label}</Subparagraph>
      <Subparagraph className="!text-now-darkest">
        {currency(value).format()}
      </Subparagraph>
      <div
        className="ml-2 h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

export function IncomeTotal({ income, year }: any) {
  const data = [
    { label: "Gross pay", value: Number(income.total?.gross_pay), color: "" },
    {
      label: "Deductions",
      value: Number(income.total?.deductions),
      color: "#FFEFD0",
    },
    { label: "Taxes", value: Number(income.total?.taxes), color: "#FED88A" },
    {
      label: "Net pay",
      value: Number(income.total?.net_pay),
      color: "#696EE3",
    },
  ];

  const [_, ...withoutGross] = data;

  return (
    <div>
      <Heading className="mb-3">Total {year} pay</Heading>
      <div className="flex items-center">
        <div className="flex-1 space-y-1.5">
          {data.map((piece) => (
            <Row key={piece.label} {...piece} />
          ))}
        </div>
        <div className="ml-4 h-[90px] w-[90px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={withoutGross}
                dataKey="value"
                innerRadius={32}
                outerRadius={45}
              >
                {withoutGross.map((piece, index) => (
                  <Cell key={`cell-${index}`} fill={piece.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
