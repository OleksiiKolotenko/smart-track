import React from "react";
import { Link } from "react-router-dom";
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
        <div className="navigation_dashboard">
          <img src={dashboard} alt="" />
          <Link to="/dashboard">
            <button className="dashboard_content">Dashboard</button>
          </Link>
        </div>
        <div className="navigation_stuff">
          <img src={stuff} alt="" />
          <Link to="/stuff">
            <button className="stuff_content">Stuff</button>
          </Link>
        </div>
        <div className="navigation_alerts">
          <img src={alerts} alt="" />
          <Link to="/alerts">
            <button className="alerts_content">Alerts</button>
          </Link>
        </div>
        <div className="navigation_sequence">
          <img src={sequence} alt="" />
          <Link to="/sequence">
            <button className="sequence_content">Sequence</button>
          </Link>
        </div>
      </div>
      <div className="sign-out">
        <img src={logout} alt="" />
        <button className="logout">Logout</button>
      </div>
    </div>
  );
}

export default LeftBar;
