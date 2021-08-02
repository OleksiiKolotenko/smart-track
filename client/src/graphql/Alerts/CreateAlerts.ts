import { gql } from "@apollo/client";

export type AlertT = {
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
