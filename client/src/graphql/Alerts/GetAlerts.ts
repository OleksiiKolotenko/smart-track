import { gql } from "@apollo/client";

export type AlertT = {
  number: string;
  status: string;
  color: string;
};

export type GetAllAlertsResponse = { getAlerts: AlertT[] };

export const GetAllAlerts = gql`
  query GetAllAlerts {
    getAlerts {
      number
      status
      color
    }
  }
`;
