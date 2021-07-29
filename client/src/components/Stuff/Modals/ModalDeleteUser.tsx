import React, { Dispatch } from "react";
import { useMutation } from "@apollo/client";
import { Form, Field } from "react-final-form";
import "./ModalStuff.scss";
import { DELETE_STUFF } from "../../../graphql/Stuff/DeleteStuff";
import { GetByRole } from "../../../graphql/Stuff/GetStuff";
import { getDoctors } from "../../../graphql/Dashboard/GetDoctors";
import { GetAllRooms } from "../../../graphql/Sequence/GetRooms";

interface ModalDeleteUserProps {
  active: boolean;
  setModalDeleteUserActive: Dispatch<boolean>;
  id: number;
}

interface Errors {
  name?: string | null;
}

export const ModalDeleteUser: React.FC<ModalDeleteUserProps> = ({
  active,
  setModalDeleteUserActive,
  id,
}) => {
  const validate = (e) => {
    const errors: Errors = {};

    return errors;
  };

  const [deleteUser] = useMutation(DELETE_STUFF);

  const outsideClick = (e) => {
    if (e.target.className === "modal active") {
      setModalDeleteUserActive(false);
    }
  };

  const onSubmit = async (obj) => {
    deleteUser({
      variables: { id: id },
      refetchQueries: [
        { query: GetByRole, variables: { role: "Doctor" } },
        { query: GetByRole, variables: { role: "Assistant" } },
        { query: GetByRole, variables: { role: "Receptionist" } },
        { query: getDoctors },
        { query: GetAllRooms },
      ],
    });
    setModalDeleteUserActive(false);
  };

  return (
    <div className={active ? "modal active" : "modal"} onClick={outsideClick}>
      <div
        className={
          active ? "modal_sequence_content active" : "modal_sequence_content"
        }
      >
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="modal"
                render={({ input, meta }) => (
                  <div className="wrap">
                    <span className="desc">Are you sure?</span>
                    <Field name="name" render={({ input, meta }) => ""} />
                    <div className="btn_wrap">
                      <button
                        type="submit"
                        className="submit"
                        style={{ marginRight: "25px" }}
                      >
                        Yes
                      </button>
                      <button
                        className="submit"
                        onClick={() => setModalDeleteUserActive(false)}
                      >
                        No
                      </button>
                    </div>
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              ></Field>
            </form>
          )}
        />
      </div>
    </div>
  );
};
