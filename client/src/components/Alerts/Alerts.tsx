import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import AlertsBlock from "./AlertsBlock";
import {
  GetAllAlerts,
  GetAllAlertsResponse,
} from "../../graphql/Alerts/GetAlerts";
import { ModalCreateAlert } from "./Modals/ModalCreateAlerts";
import { ModalEditAlert } from "./Modals/ModalEditAlerts";
import "./Alerts.scss";

interface ModalCreateAlert {
  modalCreateAlerts: boolean;
  setModalCreateAlertsActive: (id: number) => void;
}

export const Alerts = () => {
  const [modalCreateAlerts, setModalCreateAlertsActive] = useState(false);

  const toggleCreateModal = () => {
    setModalCreateAlertsActive((store) => !store);
  };

  const { data, loading } = useQuery<GetAllAlertsResponse>(GetAllAlerts);

  if (loading) {
    return <span>Page is loading...</span>;
  }
  console.log(data);
  return (
    <div className="alerts">
      <button className="add" onClick={toggleCreateModal}>
        Add new
      </button>
      <div className="alerts_box">
        {data?.getAlerts &&
          data.getAlerts.map((alert, index) => (
            <AlertsBlock
              index={index}
              status={alert.status}
              color={alert.color}
              key={`alert_${index}`}
            />
          ))}
      </div>
      {modalCreateAlerts && (
        <ModalCreateAlert
          active={modalCreateAlerts}
          setModalCreateAlertsActive={setModalCreateAlertsActive}
        ></ModalCreateAlert>
      )}
    </div>
  );
};

export default Alerts;
