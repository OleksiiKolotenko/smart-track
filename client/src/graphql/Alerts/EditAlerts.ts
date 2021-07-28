import { gql } from "@apollo/client";

export type AlertT = {
  index: number;
  status: string;
  color: string;
};

export type SendAlertResponse = { editAlert: AlertT[] };

export const EDIT_ALERT = gql`
  mutation editAlert($color: String!, $status: String!) {
    editAlert(color: $color, status: $status) {
      status
      color
    }
  }
`;
