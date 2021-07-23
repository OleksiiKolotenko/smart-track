import React from "react";
import "./AlertsBlock.scss";
import editPen from "../../img/editPen.svg";
import { FC } from "react";
import { AlertT } from "../../graphql/Alerts/GetAlerts";

export const AlertsBlock: FC<AlertT> = ({ number, status, color }) => {
  return (
    <div className="alerts_block">
      <div className="number_status">
        <span className="alerts_block_number">{number}</span>
        <span className="alerts_block_status">{status}</span>
      </div>
      <span
        className="alerts_block_color"
        style={{
          background: color,
          borderColor: color,
        }}
      ></span>
      <button className="alerts_block_edit">
        <img src={editPen} alt="" />
      </button>
    </div>
  );
};

export default AlertsBlock;
