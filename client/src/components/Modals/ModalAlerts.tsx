import React, { useState, useRef, FC } from "react";
import { Form, Field } from "react-final-form";
import "./ModalAlert.scss";

interface ModalAlertProps {
  active: boolean;
  setModalAlertsActive: any;
}

export const ModalAlert: React.FC<ModalAlertProps> = ({
  active,
  setModalAlertsActive,
}) => {
  const validate = (e) => {
    const errors = {};
    return errors;
  };

  const outsideClick = (e) => {
    if (e.target.className === "modal active") {
      setModalAlertsActive(false);
    }
  };

  const onSubmit = async (obj) => {};

  return (
    <div className={active ? "modal active" : "modal"} onClick={outsideClick}>
      <div className={active ? "modal_content active" : "modal_content"}>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="modal"
                render={({ input, meta }) => (
                  <div className="wrap">
                    <h1>Add alert</h1>
                    <span className="field">Name:</span>
                    <Field
                      name="name"
                      render={({ input, meta }) => (
                        <div className="name_input">
                          <input
                            className="name_type"
                            {...input}
                            placeholder="Alert"
                          />
                          {meta.touched && meta.error && (
                            <span>
                              {" "}
                              <br />
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    />
                    <span className="field">Pick a color:</span>
                    <Field
                      name="color"
                      render={({ input, meta }) => (
                        <div
                          className="colors_block"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span
                            style={{
                              width: "45px",
                              height: "45px",
                              backgroundColor: "#EE589730",
                              borderRadius: "25px",
                              borderColor: "#EE589730",
                            }}
                          ></span>
                          <span
                            style={{
                              width: "45px",
                              height: "45px",
                              backgroundColor: "#86E8EE30",
                              borderRadius: "25px",
                              border: "2px solid #86E8EE30",
                            }}
                          ></span>
                          <span
                            style={{
                              width: "45px",
                              height: "45px",
                              backgroundColor: "#FA700C30",
                              borderRadius: "25px",
                              border: "2px solid #FA700C30",
                            }}
                          ></span>
                          <span
                            style={{
                              width: "45px",
                              height: "45px",
                              backgroundColor: "#E485F330",
                              borderRadius: "25px",
                              border: "2px solid #E485F330",
                            }}
                          ></span>
                          <span
                            style={{
                              width: "45px",
                              height: "45px",
                              backgroundColor: "#C4E6E930",
                              borderRadius: "25px",
                              border: "2px solid #C4E6E930",
                            }}
                          ></span>
                          <span
                            style={{
                              width: "45px",
                              height: "45px",
                              backgroundColor: "#78F27530",
                              borderRadius: "25px",
                              border: "2px solid #78F27530",
                            }}
                          ></span>
                          <br />
                          {meta.touched && meta.error && (
                            <span>{meta.error}</span>
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
