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
export type GetDoctorsByResponse = { getByRole: DoctorsT[] };

export const GetDoctors = gql`
  query getByRole($role: String!) {
    getByRole(role: $role) {
      name
      id
      email
      phone
      rooms
    }
  }
`;
