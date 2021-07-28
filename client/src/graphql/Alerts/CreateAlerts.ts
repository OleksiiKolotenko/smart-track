import { gql } from "@apollo/client";

export type AlertT = {
  index: number;
  status: string;
  color: string;
};

export type SendAlertResponse = { createAlert: AlertT[] };

const createAlert = gql`
  mutation createAlert($id: number, $color: string, $status: string) {
    createAlert(id: $id, color: $color, status: $status) {
      id
      status
      color
    }
  }
`;
