import { gql } from "@apollo/client";

export type RoomT = {
  name: string;
  id: number;
  ownerID: number;
  ownerName: string;
};

export type SendEditRoomResponse = { editRoom: RoomT[] };

export const EDIT_ROOM = gql`
  mutation editRoom(
    $id: ID!
    $name: String!
    $ownerId: ID
    $ownerName: String
  ) {
    editRoom(id: $id, name: $name, ownerId: $ownerId, ownerName: $ownerName) {
      id
      name
      ownerId
      ownerName
    }
  }
`;
