import moment from "moment";

function randomInRange(n1: number, n2: number) {
  return Math.floor(
    Math.random() * (Math.trunc(n2) + 1 - Math.trunc(n1)) + Math.trunc(n1)
  );
}

function createFakeSingleIncome(accountId: string, linkItemId: string) {
  const net_pay = randomInRange(500, 5000);
  const deductions = randomInRange(50, 300);
  const taxes = Math.floor(net_pay / 10 + randomInRange(1, 100));
  const gross_pay = Math.floor(net_pay + deductions + taxes);

  return {
    account_id: accountId,
    link_item: linkItemId,
    net_pay,
    deductions,
    taxes,
    gross_pay,
  };
}

const initValues = {
  deductions: 0,
  gross_pay: 0,
  net_pay: 0,
  taxes: 0,
};

export function calculateTotal(months: any) {
  const total: any = { ...initValues };

  for (let month of months) {
    for (let key in total) {
      total[key] += month[key];
    }
  }

  return total;
}

type Opts = {
  accountId: string;
  linkItemId: string;
};

function createFakeYearlyIncome(opts: Opts, months: number = 12) {
  const monthly = Array.from({ length: months }).map((_, i) => {
    return createFakeSingleIncome(opts.accountId, opts.linkItemId);
  });

  const total = calculateTotal(monthly);

  return {
    monthly: monthly,
    total: total,
  };
}

export function createFakeIncome(accountId: string, linkItemId: string) {
  const years = Array.from({ length: 4 }).map((_, i) =>
    moment().subtract(i, "year").year()
  );

  const fakeIncome = {} as any;

  years.forEach((year) => {
    if (year === moment().year()) {
      fakeIncome[year] = createFakeYearlyIncome(
        { accountId, linkItemId },
        moment().month()
      );
    } else {
      fakeIncome[year] = createFakeYearlyIncome({ accountId, linkItemId });
    }
  });

  return {
    [linkItemId]: fakeIncome,
  };
}
