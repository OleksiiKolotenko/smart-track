import { gql } from "@apollo/client";

export type AlertT = {
  index: number;
  id: string;
  color: string;
  status: string;
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
