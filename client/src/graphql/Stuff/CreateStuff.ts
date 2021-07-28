import { gql } from "@apollo/client";

export type StuffT = {
  number: number;
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  rooms?: [
    {
      id: string;
      ownerId: string;
      ownerName: string;
      name: string;
    }
  ];
};

export type SendStuffResponse = { createStuff: StuffT[] };

export const CREATE_STUFF = gql`
  mutation createStuff(
    $name: String!
    $role: String!
    $email: String!
    $phone: String!
  ) {
    createUser(name: $name, role: $role, email: $email, phone: $phone) {
      name
      role
      email
      phone
    }
  }
`;
