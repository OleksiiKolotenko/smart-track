import { gql } from "@apollo/client";

export type RoomT = {
  id: number;
};

export type SendDeleteAlertResponse = { deleteAlert: RoomT[] };

export const DELETE_ROOM = gql`
  mutation deleteRoom($id: ID!) {
    deleteRoom(id: $id) {
      id
    }
  }
`;
