import React from "react";
import "./LeftBar.scss";
import dashboard from "../../img/dashboard.svg";
import stuff from "../../img/stuff.svg";
import alerts from "../../img/alerts.svg";
import sequence from "../../img/sequence.svg";
import logout from "../../img/sign-out.svg";

function LeftBar() {
  return (
    <div className="left">
      <p className="logo">Logo</p>
      <div className="navigation">
        <div className="dashboard">
          <img src={dashboard} alt="" />
          <span className="dashboard_content">Dashboard</span>
        </div>
        <div className="stuff">
          <img src={stuff} alt="" />
          <span className="stuff_content">Stuff</span>
        </div>
        <div className="alerts">
          <img src={alerts} alt="" />
          <span className="alerts_content">Alerts</span>
        </div>
        <div className="sequence">
          <img src={sequence} alt="" />
          <span className="sequence_content">Sequence</span>
        </div>
      </div>
      <div className="sign-out">
        <img src={logout} alt="" />
        <span className="logout">Logout</span>
      </div>
    </div>
  );
}

export default LeftBar;
