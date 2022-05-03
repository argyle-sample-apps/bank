import type { NextApiRequest, NextApiResponse } from "next";
import { getAuthOpts } from "../utils";

type Data = any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const accountId = req.query.accountId as string;
  getAccount(accountId).then((profile) => res.json(profile));
}

export function getAccount(accountId: string) {
  const url = `${process.env.NEXT_PUBLIC_ARGYLE_BASE_URL}/profiles?account=${accountId}`;

  return fetch(url, getAuthOpts())
    .then((response) => response.json())
    .then((data) => {
      const profile = data.results[0];
      return profile;
    });
}
