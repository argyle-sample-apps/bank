import type { NextApiRequest, NextApiResponse } from "next";
import { getAuthOpts } from "../utils";

type Data = any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userId = req.query.userId as string;
  getUser(userId).then((user) => res.json(user));
}

export function getUser(userId: string) {
  const url = `${process.env.NEXT_PUBLIC_ARGYLE_BASE_URL}/accounts?user=${userId}`;

  return fetch(url, getAuthOpts())
    .then((response) => response.json())
    .then((data) => {
      return data?.results;
    });
}
