import { gql } from "@apollo/client";

export type AlertT = {
  id: string;
  status: string;
  color: string;
};

export type GetAllAlertsResponse = { getAlerts: AlertT[] };

export const GetAllAlerts = gql`
  query GetAllAlerts {
    getAlerts {
      id
      status
      color
    }
  }
`;
