import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Label,
  ResponsiveContainer,
  ReferenceLine,
  LineChart,
  Line,
  YAxis,
} from "recharts";
import currency from "currency.js";
import { Footnote } from "./typography";

type IncomeChartProps = {
  data: any;
  accounts: any;
};

function CustomTooltip({ payload, label, active }: any) {
  if (active) {
    return (
      <div className="rounded-sm bg-gray-300 bg-opacity-60 p-2">
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center">
            <div
              className="mr-2 h-2 w-2 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            <Footnote className="!text-now-darkest">
              {currency(p.value).format()}
            </Footnote>
          </div>
        ))}
        <Footnote className="!text-now-grey">{label}</Footnote>
      </div>
    );
  }

  return null;
}

export function StackedBarYearChart({ data, accounts }: IncomeChartProps) {
  const filtered = data.filter((data: any) => data.total > 0);
  const average =
    filtered.reduce((acc: any, value: any) => acc + value.total, 0) /
    filtered.length;
  const vals = data.map((d: any) => d.total);
  const max = Math.max(...vals);
  const domain = [0, max];
  const label = currency(average).format() + " avg";

  return (
    <>
      <div className="relative h-[160px] w-full">
        <ResponsiveContainer
          className="absolute inset-0"
          width="100%"
          height="100%"
        >
          <LineChart data={data} margin={{ bottom: 35, top: 5 }}>
            <YAxis hide={true} domain={domain} />
            <Line type="monotone" dataKey="avg" stroke="transparent" />
            <ReferenceLine
              ifOverflow="extendDomain"
              y={average}
              stroke="#9ca3af"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            >
              <Label value={label} position="insideBottomRight" />
            </ReferenceLine>
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="70%" height="100%">
          <BarChart data={data} maxBarSize={6}>
            <XAxis
              tick={{ fill: "black", fontSize: 10, opacity: 0.4 }}
              dataKey="month"
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide={true} domain={domain} />
            <Tooltip content={<CustomTooltip />} cursor={{ opacity: 0.2 }} />
            {accounts.map((account: any, index: number) => {
              const numAccounts = accounts.length;

              let radius: [number, number, number, number] = [10, 10, 10, 10];

              if (numAccounts === 2) {
                if (index == 0) {
                  radius = [0, 0, 10, 10];
                } else if (index == 1) {
                  radius = [10, 10, 0, 0];
                }
              }

              if (numAccounts > 2) {
                if (index == 0) {
                  radius = [0, 0, 10, 10];
                } else if (index == numAccounts - 1) {
                  radius = [10, 10, 0, 0];
                } else {
                  radius = [0, 0, 0, 0];
                }
              }

              return (
                <Bar
                  key={account.id}
                  dataKey={`data[${account.link_item}].gross_pay`}
                  stackId="a"
                  fill={account.color}
                  radius={radius}
                />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
