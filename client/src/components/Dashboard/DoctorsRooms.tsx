import React from "react";
import "./DoctorsRooms.scss";
import empty from "../../img/empty.svg";
import triangle from "../../img/triangle.svg";

export const DoctorsRooms = ({ name }) => {
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
          <div className="status">
            <img src={empty} alt="" className="status_icon" />
            <span className="choose_status">
              Empty
              <img src={triangle} alt="" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsRooms;
