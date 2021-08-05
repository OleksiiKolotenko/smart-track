import { gql } from "@apollo/client";

export type RoomT = {
  id: number;
  ownerID: number;
  ownerName: string;
};

export type SendEditRoomResponse = { editRoom: RoomT[] };

export const SET_OWNER = gql`
  mutation setRoomOwner($id: ID!, $ownerId: ID!, $ownerName: String!) {
    setRoomOwner(id: $id, ownerId: $ownerId, ownerName: $ownerName) {
      id
      ownerId
      ownerName
    }
  }
`;
