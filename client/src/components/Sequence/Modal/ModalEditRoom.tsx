import React from "react";
import { useMutation } from "@apollo/client";
import { EDIT_ROOM } from "../../../graphql/Sequence/EditRooms";

import { Form, Field } from "react-final-form";
import "./ModalRoom.scss";
import { GetAllRooms } from "../../../graphql/Sequence/GetRooms";
import { getDoctors } from "../../../graphql/Dashboard/GetDoctors";

interface ModalRoomProps {
  active: boolean;
  setModalEditRoomActive: any;
  id: number;
  ownerId?: number;
  ownerName?: string;
}

interface Errors {
  name?: string | null;
}

export const ModalEditRoom: React.FC<ModalRoomProps> = ({
  active,
  setModalEditRoomActive,
  id,
  ownerId,
  ownerName,
}) => {
  const validate = (e) => {
    const errors: Errors = {};

    let regexName = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

    if (!e.name) {
      errors.name = "Name can't be empty";
    }

    if (e.name && e.name.match(regexName)) {
      errors.name = "Special symbols are forbiden";
    }

    if (e.name && e.name.length < 2) {
      errors.name = "Name should contain only 2 letters";
    }

    if (e.name && e.name.length > 2) {
      errors.name = "Name should contain only 2 letters";
    }

    return errors;
  };

  const outsideClick = (e) => {
    if (e.target.className === "modal active") {
      setModalEditRoomActive(false);
    }
  };
  const [editRoom] = useMutation(EDIT_ROOM);

  const onSubmit = async (obj) => {
    editRoom({
      variables: {
        id: id,
        name: obj.name,
        ownerId: ownerId,
        ownerName: ownerName,
      },
      refetchQueries: [{ query: GetAllRooms }, { query: getDoctors }],
    });
    setModalEditRoomActive(false);
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
                    <span className="desc">Edit room</span>
                    <span className="field">Name:</span>
                    <Field
                      name="name"
                      render={({ input, meta }) => (
                        <div className="input">
                          <input
                            className="type"
                            {...input}
                            placeholder="name"
                          />
                          {meta.touched && meta.error && (
                            <span
                              style={{
                                fontSize: "14px",
                                display: "flex",
                                marginTop: "24%",
                                width: "auto",
                              }}
                            >
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    />
                    <div className="btn_wrap">
                      <button type="submit" className="submit">
                        Save
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