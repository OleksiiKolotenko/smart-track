import { useMutation } from "@apollo/client";
import { CREATE_ALERT } from "../../../graphql/Alerts/CreateAlerts";
import React, { useState, Dispatch } from "react";
import { Form, Field } from "react-final-form";
import "./ModalAlert.scss";
import { GetAllAlerts } from "../../../graphql/Alerts/GetAlerts";

const colors = [
  "#EE589730",
  "#86E8EE30",
  "#FA700C30",
  "#E485F330",
  "#C4E6E930",
  "#78F27530",
];

interface ModalAlertProps {
  active: boolean;
  setModalCreateAlertsActive: Dispatch<boolean>;
}

export const ModalCreateAlert: React.FC<ModalAlertProps> = ({
  active,
  setModalCreateAlertsActive,
}) => {
  const validate = (e) => {
    const errors = {};
    return errors;
  };
  const [CreateAlert] = useMutation(CREATE_ALERT);
  const outsideClick = (e) => {
    if (e.target.className === "modal active") {
      setModalCreateAlertsActive(false);
    }
  };

  const onSubmit = async (obj) => {
    CreateAlert({
      variables: { status: obj.name, color: colors[activeColor] },
      refetchQueries: [{ query: GetAllAlerts }],
    });
    setModalCreateAlertsActive(false);
  };

  const [activeColor, setActiveColor] = useState(0);

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
                    <h1>Add alert</h1>
                    <span className="field">Status:</span>
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
                      type="radio"
                      name="color"
                      render={({ input, meta }) => (
                        <div
                          className="colors_block"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {colors.map((color, index) => (
                            <React.Fragment key={color + index}>
                              <input
                                type="radio"
                                id={`radio-${index}`}
                                className="hide"
                                {...input}
                                value={color}
                                onChange={() => setActiveColor(index)}
                              />
                              <label
                                htmlFor={`radio-${index}`}
                                className={`colors_list ${
                                  activeColor === index
                                    ? "colors_list_active"
                                    : ""
                                }`}
                                style={{
                                  backgroundColor: color,
                                  border: `2px solid ${color}`,
                                }}
                              ></label>
                            </React.Fragment>
                          ))}
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
