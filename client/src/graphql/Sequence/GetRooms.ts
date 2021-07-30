import { gql } from "@apollo/client";

export type SequenceT = {
  id: number;
  name: string;
  ownerId: string;
  ownerName: string;
  statusAlert: string;
};

export type GetAllSequenceResponse = { getRooms: SequenceT[] };

export const GetAllRooms = gql`
  query GetAllRooms {
    getRooms {
      id
      name
      ownerId
      ownerName
      statusAlert {
        id
        status
        color
      }
    }
  }
`;
