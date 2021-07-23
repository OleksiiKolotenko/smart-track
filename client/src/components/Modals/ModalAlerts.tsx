import React, { useState, useRef, FC } from "react";
import { Form, Field } from "react-final-form";
import "./ModalAlert.scss";

interface ModalAlertProps {
  active: boolean;
  setModalAlertsActive: any;
  toggleModal: any;
}

export const ModalAlert: React.FC<ModalAlertProps> = ({
  active,
  setModalAlertsActive,
  toggleModal,
}) => {
  const bgRef = useRef();
  const validate = (e) => {
    const errors = {};
    return errors;
  };

  const outsideClick = (e) => {
    if (e.target === bgRef.current) {
      setModalAlertsActive(false);
    }
  };
  const onSubmit = async (obj) => {};

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={outsideClick}
      data-ref={bgRef}
    >
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
                        <div>
                          <input {...input} placeholder="Not done" />
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
