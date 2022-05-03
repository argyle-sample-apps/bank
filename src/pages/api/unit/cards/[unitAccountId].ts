import type { NextApiRequest, NextApiResponse } from "next";
import { getUnitHeaders } from "../../utils";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = `${process.env.UNIT_API_URL}/cards`;
  const unitAccountId = req.query.unitAccountId;

  if (req.method === "POST") {
    const config = {
      data: {
        type: "individualVirtualDebitCard",
        attributes: {
          limits: {
            dailyWithdrawal: 1000,
            dailyPurchase: 2000,
            monthlyWithdrawal: 5000,
            monthlyPurchase: 7000,
          },
        },
        relationships: {
          account: {
            data: {
              type: "depositAccount",
              id: unitAccountId,
            },
          },
        },
      },
    };

    const options = {
      headers: getUnitHeaders(),
      method: "POST",
      body: JSON.stringify(config),
    };

    const response = await fetch(url, options);
    const json = await response.json();

    res.status(200).json(json.data);
  } else {
    //
  }
}
