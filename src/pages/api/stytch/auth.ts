import { getStytch } from "api";
import demoState from "demoState.json";

async function handler(req: any, res: any) {
  const client = getStytch();

  const params = {
    method_id: req.body.method_id,
    code: req.body.code,
  };

  const state = {
    isDemoAccount: true,
    ...demoState,
  };

  client.otps
    .authenticate(params)
    .then((resp: any) => {
      resp.state = state;
      res.json(resp);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
}

export default handler;
