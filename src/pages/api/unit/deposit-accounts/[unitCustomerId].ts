import type { NextApiRequest, NextApiResponse } from "next";
import { getUnitHeaders } from "../../utils";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const unitCustomerId = req.query.unitAccountId as string;
  const url = `${process.env.UNIT_API_URL}/accounts?filter[customerId]=${unitCustomerId}`;

  const request = {
    headers: getUnitHeaders(),
  };

  const response = await fetch(url, request);
  const json = await response.json();

  //   return json
  //   return json.data[0] as Customer;
  res.status(200).json(json);
}
