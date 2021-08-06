import { gql } from "@apollo/client";

export type RoomT = {
  id: number;
  ownerID: number;
  ownerName: string;
};

export type SendEditRoomResponse = { editRoom: RoomT[] };

export const CLEAR_OWNER = gql`
  mutation clearRoomOwner($id: ID!, $ownerId: ID!, $ownerName: String!) {
    nullRoomOwner(id: $id, ownerId: $ownerId, ownerName: $ownerName) {
      id
      ownerId
      ownerName
    }
  }
`;
