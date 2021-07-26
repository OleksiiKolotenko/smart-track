import { gql } from "@apollo/client";

export type DashboardT = {
  name: string;
  id: number;
};

export type GetByRoleResponse = { getByRole: DashboardT[] };

export const GetByRole = gql`
  query getByRole($role: String!) {
    getByRole(role: $role) {
      name
      id
    }
  }
`;
