import * as stytch from "stytch";

// @ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

let stytchClient: stytch.Client;
export const getStytch = () => {
  if (!stytchClient) {
    stytchClient = new stytch.Client({
      project_id: process.env.STYTCH_PROJECT_ID || "",
      secret: process.env.STYTCH_SECRET || "",
      env:
        process.env.STYTCH_PROJECT_ENV === "live"
          ? stytch.envs.live
          : stytch.envs.test,
    });
  }

  return stytchClient;
};
