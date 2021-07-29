import { useMutation } from "@apollo/client";
import React from "react";
import { Form, Field } from "react-final-form";
import "./ModalStuff.scss";
import { EDIT_USER } from "../../../graphql/Stuff/EditStuff";
import { GetAllUsers, GetByRole } from "../../../graphql/Stuff/GetStuff";
import { getDoctors } from "../../../graphql/Dashboard/GetDoctors";

interface ModalStuffProps {
  active: boolean;
  setModalEditStuffActive: any;
  id: number;
}

interface Errors {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  id?: number | null;
}

export const ModalEditStuff: React.FC<ModalStuffProps> = ({
  active,
  setModalEditStuffActive,
  id,
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
    if (e.email && !e.email.includes("@")) {
      errors.email = "Email is incorrect.";
    }

    if (!e.email) {
      errors.email = "Email can't be empty";
    }

    if (e.email && !e.email.includes(".")) {
      errors.email = "Email is incorrect.";
    }

    if (!e.phone) {
      errors.phone = "Phone can't be empty";
    }

    if (e.phone && e.phone.length !== 12) {
      errors.phone = "Phone should contain 12 numbers";
    }

    if (e.phone && e.phone.includes("+")) {
      errors.phone = "+ is added automatically";
    }
    return errors;
  };

  const outsideClick = (e) => {
    if (e.target.className === "modal active") {
      setModalEditStuffActive(false);
    }
  };

  const [editUser] = useMutation(EDIT_USER);

  const onSubmit = async (obj) => {
    editUser({
      variables: {
        id: id,
        name: obj.name,
        email: obj.email,
        phone: obj.phone,
        role: obj.role,
      },
      refetchQueries: [
        { query: GetByRole, variables: { role: "Doctor" } },
        { query: GetByRole, variables: { role: "Assistant" } },
        { query: GetByRole, variables: { role: "Receptionist" } },
        { query: getDoctors },
      ],
    });
    setModalEditStuffActive(false);
  };

  return (
    <div className={active ? "modal active" : "modal"} onClick={outsideClick}>
      <div
        className={
          active ? "modal_stuff_content active" : "modal_stuff_content"
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
                    <h1>Edit</h1>
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
                    <span className="field">Email:</span>
                    <Field
                      name="email"
                      render={({ input, meta }) => (
                        <div className="input">
                          <input
                            className="type"
                            {...input}
                            placeholder="email"
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
                    <span className="field">Phone number:</span>
                    <Field
                      name="phone"
                      render={({ input, meta }) => (
                        <div className="input">
                          <input
                            className="type"
                            {...input}
                            placeholder="380000000000"
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
                    <span className="field">Choose a role</span>
                    <Field
                      name="role"
                      component="select"
                      className="role"
                      defaultValue="Doctor"
                    >
                      <option className="options">Doctor</option>
                      <option className="options">Assistant</option>
                      <option className="options">Receptionist</option>
                    </Field>
                    <div className="btn_wrap">
                      <button type="submit" className="submit">
                        Save edit
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