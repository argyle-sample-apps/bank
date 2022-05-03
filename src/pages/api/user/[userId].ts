import type { NextApiRequest, NextApiResponse } from "next";
import { getAuthOpts } from "../utils";

type Data = any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userId = req.query.userId;

  const url = `${process.env.NEXT_PUBLIC_ARGYLE_BASE_URL}/users/${userId}`;

  fetch(url, getAuthOpts())
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    });
}
