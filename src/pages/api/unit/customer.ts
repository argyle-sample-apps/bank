import { Customer } from "models/customer";
import { Profile } from "models/profile";
import { getUnitHeaders } from "../utils";

export async function getCustomer(userId: string) {
  const url = `${process.env.UNIT_API_URL}/customers?filter[tags]={"userId": "${userId}"}`;
  // https://api.s.unit.sh/customers?page[limit]=10&filter[tags]={"userId": "106a75e9-de77-4e25-9561-faffe59d7814"}

  // TODO: should never return >1 user

  const request = {
    headers: getUnitHeaders(),
  };

  const response = await fetch(url, request);
  const json = await response.json();
  return json.data[0] as Customer;
}

export async function createApprovedApplication(
  userId: string,
  profile: Profile
) {
  const url = `${process.env.UNIT_API_URL}/applications`;

  const request = {
    method: "POST",
    headers: getUnitHeaders(),
    body: JSON.stringify({
      data: {
        type: "individualApplication",
        attributes: {
          ssn: profile.ssn.replaceAll("-", ""),
          fullName: {
            first: profile.first_name,
            last: profile.last_name,
          },
          dateOfBirth: profile.birth_date,
          address: {
            street: profile.address.line1,
            city: profile.address.city,
            state: profile.address.state,
            postalCode: profile.address.postal_code,
            country: profile.address.country,
          },
          email: profile.email,
          phone: {
            countryCode: "1",
            number: profile.phone_number.substring(2),
          },
          // ip: "127.0.0.1",
          // soleProprietorship: true,
          // ein: "123456789",
          // dba: "Piedpiper Inc",
          tags: {
            userId,
          },
          // idempotencyKey: "3a1a33be-4e12-4603-9ed0-820922389fb8"
        },
      },
    }),
  };

  const response = await fetch(url, request);
  const json = await response.json();

  return json.data;
}
