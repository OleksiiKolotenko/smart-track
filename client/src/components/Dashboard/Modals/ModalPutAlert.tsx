import React, { Dispatch, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Field } from "react-final-form";
import "./ModalPutAlert.scss";
import {
  GetAllAlerts,
  GetAllAlertsResponse,
} from "../../../graphql/Alerts/GetAlerts";

interface ModalPutAlert {
  active: boolean;
  setModalPutAlertActive: Dispatch<boolean>;
  data: any;
}

export const ModalPutAlert: React.FC<ModalPutAlert> = ({
  active,
  setModalPutAlertActive,
  data,
}) => {
  const validate = (e) => {
    const errors = {};
    return errors;
  };

  const outsideClick = (e) => {
    if (e.target.className === "modal active") {
      setModalPutAlertActive(false);
    }
  };

  const onSubmit = async (obj) => {
    setModalPutAlertActive(false);
  };

  const [activeAlert, setActiveAlert] = useState("");

  return (
    <div className={active ? "modal active" : "modal"} onClick={outsideClick}>
      <div
        className={
          active ? "modal_dashboard_content active" : "modal_dashboard_content"
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
                    <Field
                      name="alerts"
                      render={({ input, meta }) => (
                        <div className="choose_alerts_block">
                          {data.map((obj) => {
                            {
                              return (
                                <div className="alerts_choice">
                                  <div
                                    className="block"
                                    onClick={() => setActiveAlert(obj.id)}
                                  >
                                    {console.log(activeAlert)}
                                    <div
                                      className="round"
                                      style={{
                                        backgroundColor: obj.color,
                                        border: `2px solid ${obj.color}`,
                                      }}
                                    >
                                      <span>{obj.status.slice(0, 1)}</span>
                                    </div>
                                    <span className="status">{obj.status}</span>
                                  </div>
                                </div>
                              );
                            }
                          })}

                          {meta.touched && meta.error && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    />
                    <div className="btn_wrap">
                      <button type="submit" className="submit">
                        Set
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
