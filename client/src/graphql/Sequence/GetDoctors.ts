import { gql } from "@apollo/client";

export type DoctorsT = {
  number: number;
  id: number;
  name: string;
  email: string;
  role: string;
  phone: number;
  rooms?: string;
};
export type GetDoctorsByResponse = { getDoctors: DoctorsT[] };

export const getDoctors = gql`
  query getDoctors {
    getDoctors {
      id
      name
      rooms {
        id
        name
        ownerId
        ownerName
      }
    }
  }
`;
