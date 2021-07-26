import { gql } from "@apollo/client";

export type SequenceT = {
  id: number;
  name: string;
};

export type GetAllSequenceResponse = { getRooms: SequenceT[] };

export const GetAllRooms = gql`
  query GetAllRooms {
    getRooms {
      id
      name
    }
  }
`;
