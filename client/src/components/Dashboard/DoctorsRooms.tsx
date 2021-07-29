import React, { useState } from "react";
import "./DoctorsRooms.scss";
import empty from "../../img/empty.svg";
import triangle from "../../img/triangle.svg";
import { ModalPutAlert } from "./Modals/ModalPutAlert";
import { useQuery } from "@apollo/client";
import {
  GetAllAlerts,
  GetAllAlertsResponse,
} from "../../graphql/Alerts/GetAlerts";

export const DoctorsRooms = ({ name }) => {
  const [modalPutAlert, setModalPutAlertActive] = useState(false);

  const togglePutAlertModal = () => {
    setModalPutAlertActive((store) => !store);
  };

  const { data, loading } = useQuery<GetAllAlertsResponse>(GetAllAlerts);
  return (
    <div className="room_wrap">
      <div className="doctor_rooms">
        <div className="dashboard_room_card">
          <div className="top">
            <div className="number_block">
              <span className="number">{name}</span>
            </div>
            <span className="r">R</span>
            <span className="time" style={{ color: "#FC7E55" }}>
              10:56
            </span>
          </div>
          <div className="status" onClick={togglePutAlertModal}>
            <img src={empty} alt="empty" className="status_icon" />
            <span className="choose_status">
              Empty
              <img src={triangle} alt="triangle" />
            </span>
          </div>
        </div>
      </div>
      {modalPutAlert && (
        <ModalPutAlert
          data={data?.getAlerts}
          active={modalPutAlert}
          setModalPutAlertActive={setModalPutAlertActive}
        ></ModalPutAlert>
      )}
    </div>
  );
};

export default DoctorsRooms;
