import { gql } from "@apollo/client";

export type RoomT = {
  name: string;
};

export type SendRoomResponse = { createRoom: RoomT[] };

export const CREATE_ROOM = gql`
  mutation CreateRoom($name: String!) {
    createRoom(name: $name) {
      name
    }
  }
`;
