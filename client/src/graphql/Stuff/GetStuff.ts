import { gql } from "@apollo/client";

export type StuffT = {
  number: number;
  id: number;
  name: string;
  email: string;
  role: string;
  phone: number;
  rooms?: [
    {
      id: string;
      ownerId: string;
      ownerName: string;
      name: string;
    }
  ];
};

export type GetAllUsersResponse = { getUsers: StuffT[] };
export type GetByRoleResponse = { getByRole: StuffT[] };

export const GetAllUsers = gql`
  query GetAllUsers {
    getUsers {
      id
      name
      email
      role
      phone
      rooms {
        id
        name
        ownerId
        ownerName
      }
    }
  }
`;

export const GetByRole = gql`
  query getByRole($role: String!) {
    getByRole(role: $role) {
      name
      id
      email
      phone
      rooms {
        id
        name
        ownerId
        ownerName
      }
    }
  }
`;
