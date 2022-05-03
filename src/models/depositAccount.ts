export type DepositAccountAttributes = {
  name: string;
  createdAt: string;
  routingNumber: string;
  accountNumber: string;
  depositProduct: string; //'checking',
  balance: number;
  hold: number;
  available: number;
  currency: string; //'USD',
  status: string; //'Open'
};

export type DepositAccount = {
  type: string; // 'depositAccount',
  id: string;
  attributes: DepositAccountAttributes;
};
