import { getAuthOpts } from "../utils";

export async function encryptPayDistributionConfig(config: any) {
  const url = `${process.env.NEXT_PUBLIC_ARGYLE_BASE_URL}/pay-distribution-configs/encrypt`;

  const options = {
    ...getAuthOpts(),
    method: "POST",
    body: JSON.stringify(config),
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    return json.encrypted_config;
  } catch (error) {
    console.log(error);
  }
}
