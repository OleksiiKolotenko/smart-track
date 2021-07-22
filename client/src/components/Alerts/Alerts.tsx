import React from "react";
import "./Alerts.scss";
import editPen from "../../img/editPen.svg";

export const Alerts = () => {
  return (
    <div className="alerts">
      <button className="add">Add new</button>
      <div className="alerts_box">
        <div className="alerts_block">
          <span className="alerts_block_number">1</span>
          <span className="alerts_block_status">Patient in</span>
          <span className="alerts_block_color"></span>
          <button className="alerts_block_edit">
            <img src={editPen} alt="" />
          </button>
        </div>
        <div className="alerts_block">
          <span className="alerts_block_number">2</span>
          <span className="status">Empty</span>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
