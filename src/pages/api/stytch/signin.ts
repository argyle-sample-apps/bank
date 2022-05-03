import { getStytch } from "api";

async function handler(req: any, res: any) {
  const client = getStytch();

  const params = {
    phone_number: req.body.phone_number,
  };

  client.otps.sms
    .loginOrCreate(params)
    .then((resp) => {
      res.json(resp);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
}

export default handler;
