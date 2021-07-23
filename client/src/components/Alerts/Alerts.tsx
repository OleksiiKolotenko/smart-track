import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import AlertsBlock from "./AlertsBlock";
import {
  GetAllAlerts,
  GetAllAlertsResponse,
} from "../../graphql/Alerts/GetAlerts";
import { ModalAlert } from "../Modals/ModalAlerts";
import "./Alerts.scss";

interface ModalAlerts {
  modalAlerts: boolean;
  setModalAlertsActive: (id: number) => void;
}

export const Alerts = () => {
  const [modalAlerts, setModalAlertsActive] = React.useState(false);
  const toggleModal = () => {
    setModalAlertsActive((store) => !store);
  };
  const { data, loading } = useQuery<GetAllAlertsResponse>(GetAllAlerts);

  return (
    <div className="alerts">
      <button className="add" onClick={toggleModal}>
        Add new
      </button>
      <div className="alerts_box">
        {data?.getAlerts &&
          data.getAlerts.map((alert, index) => (
            <AlertsBlock
              number={alert.number}
              status={alert.status}
              color={alert.color}
              key={`alert_${index}`}
            />
          ))}
      </div>
      {modalAlerts && (
        <ModalAlert
          active={modalAlerts}
          setModalAlertsActive={setModalAlertsActive}
          toggleModal={toggleModal}
        ></ModalAlert>
      )}
    </div>
  );
};

export default Alerts;
