import type { NextApiRequest, NextApiResponse } from "next";
import { getAuthOpts } from "../../utils";
import moment from "moment";

type Data = any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userId = req.query.userId;
  const year = req.query.year || moment().year();

  const options = getAuthOpts({
    headers: { "x-argyle-is-sandbox": "true" },
  });

  const url = `${process.env.BFF_API_URL}/income/payouts/${year}?user=${userId}`;

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    });
}
