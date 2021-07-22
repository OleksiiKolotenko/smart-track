import React from "react";
import "./DashboardCard.scss";
import empty from "../../img/empty.svg";
import triangle from "../../img/triangle.svg";
export const DashboardCard = () => {
  return (
    <div className="card">
      <div className="doctor">
        <button className="reset">Reset</button>
        <span className="name">Dr Who</span>
        <span className="job">Therapist</span>
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
      <div className="doctor_rooms">
        <div className="dashboard_room_card">
          <div className="top">
            <div className="number_block">
              <span className="number">1b</span>
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

export default DashboardCard;
