import { gql } from "@apollo/client";

export type StuffT = {
  id: number;
};

export type SendDeleteAlertResponse = { deleteUser: StuffT[] };

export const DELETE_STUFF = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
