import type { NextApiRequest, NextApiResponse } from "next";
import { getAuthOpts } from "../utils";

type Data = any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const accountId = req.query.accountId;

  const url = `${process.env.NEXT_PUBLIC_ARGYLE_BASE_URL}/payouts?account=${accountId}`;

  fetch(url, getAuthOpts())
    .then((response) => response.json())
    .then((data) => {
      res.json(data.results);
    });
}
