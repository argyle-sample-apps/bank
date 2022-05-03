type AuthOpts = {
  headers?: { [id: string]: string };
};

type PostOpts = {
  method: "POST";
  headers: { [id: string]: string };
  body: any;
};

export const getAuthOpts = (params?: AuthOpts) => {
  const authString =
    process.env.ARGYLE_API_KEY + ":" + process.env.ARGYLE_API_SECRET;

  const authToken = Buffer.from(authString).toString("base64");

  const options = {
    headers: {
      Authorization: "Basic " + authToken,
      "Content-Type": "application/json",
      ...params?.headers,
    },
  };
  return options;
};

export const getPostOpts = (body?: any) => {
  const options: PostOpts = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  return options;
};

export const getUnitHeaders = () => {
  const headers = {
    Authorization: "Bearer " + process.env.UNIT_API_KEY,
    "Content-Type": "application/vnd.api+json",
  };
  return headers;
};
