import React from "react";
import "./DashboardCard.scss";
import DoctorsRoom from "./DoctorsRooms";
export const DashboardCard = ({ name, rooms }) => {
  return (
    <div className="card">
      <div className="doctor">
        <button className="reset">Reset</button>
        <span className="name">{name}</span>
        <span className="job">Doctor</span>
        <span className="doctor_line"></span>
        <div className="doctor_query">
          <button className="minus">-</button>
          <span className="state">5</span>
          <button className="plus">+</button>
          <span
            style={{ fontSize: "14px", color: "#969696", marginRight: "83px" }}
          >
            in line
          </span>
          <button className="stop">Stop the line</button>
        </div>
      </div>
      <span className="line"></span>
      <div className="rooms_wrap">
        {rooms &&
          rooms.map((rooms, index) => (
            <DoctorsRoom name={rooms.name} key={`rooms${index}`} />
          ))}
      </div>
    </div>
  );
};

export default DashboardCard;
