import React, { useState, FC } from "react";
import { Form, Field } from "react-final-form";
import "./ModalAlert.scss";

interface ModalAlertProps {
  active: boolean;
  setModalEditAlertsActive: any;
}

export const ModalEditAlert: React.FC<ModalAlertProps> = ({
  active,
  setModalEditAlertsActive,
}) => {
  const validate = (e) => {
    const errors = {};
    return errors;
  };

  const outsideClick = (e) => {
    if (e.target.className === "modal active") {
      setModalEditAlertsActive(false);
    }
  };

  const onSubmit = async (obj) => {
    console.log(obj);
  };

  return (
    <div className={active ? "modal active" : "modal"} onClick={outsideClick}>
      <div
        className={
          active ? "modal_alert_content active" : "modal_alert_content"
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
                    <h1>Edit alert</h1>
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
                            className="colors_list"
                            style={{
                              backgroundColor: "#EE589730",
                              border: "2px solid #EE589730",
                            }}
                          ></span>
                          <span
                            className="colors_list"
                            style={{
                              backgroundColor: "#86E8EE30",
                              border: "2px solid #86E8EE30",
                            }}
                          ></span>
                          <span
                            className="colors_list"
                            style={{
                              backgroundColor: "#FA700C30",
                              border: "2px solid #FA700C30",
                            }}
                          ></span>
                          <span
                            className="colors_list"
                            style={{
                              backgroundColor: "#E485F330",
                              border: "2px solid #E485F330",
                            }}
                          ></span>
                          <span
                            className="colors_list"
                            style={{
                              backgroundColor: "#C4E6E930",
                              border: "2px solid #C4E6E930",
                            }}
                          ></span>
                          <span
                            className="colors_list"
                            style={{
                              backgroundColor: "#78F27530",
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
