export type CustomerAddress = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type CustomerAttributes = {
  address: CustomerAddress;
  // dateOfBirth: "1980-10-10"
  // email: "test1@argyle.io"
  // fullName: {first: 'Bob', last: 'Jones'}
  // phone: {countryCode: '1', number: '8009000001'}
  riskRate: string; // "low"
  // soleProprietorship: false
  // ssn: "522091191"
  status: string; // "Active"
  // tags: {userId: '017fd5f1-5be6-0aae-218d-87679505f53a'}
};

export type CustomerApplication = {
  //     data:
  // id: "329479"
  // type: "application"
};

export type CustomerRelationships = {
  application: CustomerApplication;
};

export type Customer = {
  attributes: CustomerAttributes;
  id: string;
  relationships: CustomerRelationships;
  type: string; //"individualCustomer"
};
