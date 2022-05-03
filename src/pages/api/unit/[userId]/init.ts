import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../accounts/[userId]";
import { getAccount } from "../../profiles/[accountId]";
import { createDepositAccount, getDepositAccounts } from "./../depositAccount";
import { createApprovedApplication, getCustomer } from "./../customer";
import { DepositAccount } from "models/depositAccount";
import { encryptPayDistributionConfig } from "./../encryptPayDistributionConfig";

type Data = any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userId = req.query.userId as string;
  let error = "";
  getOrCreateCustomer(userId)
    .then((customer) => {
      getOrCreateBankAccounts(customer.id).then((depositAccounts) => {
        const checkingAccount = depositAccounts.find(
          (acc: any) => acc.attributes.tags.purpose === "checking"
        ) as DepositAccount;

        const savingsAccount = depositAccounts.find(
          (acc: any) => acc.attributes.tags.purpose === "saving"
        ) as DepositAccount;

        getEncryptedConfig(checkingAccount).then((encryptedConfig) => {
          const response = {
            customer,
            checkingAccount,
            savingsAccount,
            encryptedConfig,
          };

          res.json(response);
        });
      });
    })
    .catch((e) => {
      console.log(e);
      res.json({ error: "Something went wrong with Unit flow" });
    });
}

// gets or creates customer (if doesn't exist with specific user id)
function getOrCreateCustomer(userId: string) {
  return getCustomer(userId).then((customer) => {
    if (customer) {
      return customer;
    } else {
      return getUser(userId)
        .then((accounts) => {
          const accId = accounts[0].id;
          return getAccount(accId);
        })
        .then((profile) => {
          return createApprovedApplication(userId, profile);
        })
        .then(() => {
          return getCustomer(userId);
        })
        .then((customer) => customer);
    }
  });
}

function getOrCreateBankAccounts(customerId: string) {
  return getDepositAccounts(customerId).then((depositAccounts) => {
    // console.log("check if exists", depositAccounts);
    if (depositAccounts.length > 0) {
      return depositAccounts;
    } else {
      const checking = createDepositAccount(customerId, "checking");
      const saving = createDepositAccount(customerId, "saving");

      return Promise.all([checking, saving]).then((depositAccounts) => {
        return depositAccounts;
      });

      // return createDepositAccounts(customerId).then((depositAccount) => {
      //   return depositAccount;
      // });
    }
  });
}

function getEncryptedConfig(depositAccount: DepositAccount) {
  const { routingNumber, accountNumber } = depositAccount.attributes;

  const config = {
    bank_account: {
      bank_name: "Finance Now",
      routing_number: routingNumber,
      account_number: accountNumber,
      account_type: "checking",
    },
    allow_editing: false,
    entire_allocation: true,
    default_allocation_type: "percent",
  };

  return encryptPayDistributionConfig(config).then((encryptedConfig) => {
    return encryptedConfig;
  });
}
