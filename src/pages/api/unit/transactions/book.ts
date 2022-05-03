import type { NextApiRequest, NextApiResponse } from "next";
import { getUnitHeaders } from "../../utils";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);

    const url = `${process.env.UNIT_API_URL}/payments`;

    const config = {
      data: {
        type: "bookPayment",
        attributes: {
          amount: body.amount,
          direction: "Credit",
          description: body.description,
          transactionSummaryOverride: body.description,
          tags: {
            purpose: body.purpose,
          },
        },
        relationships: {
          account: {
            data: {
              type: "depositAccount",
              id: body.from,
            },
          },
          counterpartyAccount: {
            data: {
              type: "depositAccount",
              id: body.to,
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

    res.status(200).json(json);
  } else {
    // Handle any other HTTP method
  }
}
