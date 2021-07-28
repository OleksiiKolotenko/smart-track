import { gql } from "@apollo/client";

export type AlertT = {
  index: number;
  status: string;
  color: string;
};

export type SendAlertResponse = { createAlert: AlertT[] };

export const CREATE_ALERT = gql`
  mutation createAlert($color: String!, $status: String!) {
    createAlert(color: $color, status: $status) {
      status
      color
    }
  }
`;
