import React, { FC } from "react";
import { NavLink, Route, useHistory } from "react-router-dom";
import "./LeftBar.scss";
import dashboard from "../../img/dashboard.svg";
import stuff from "../../img/stuff.svg";
import alerts from "../../img/alerts.svg";
import sequence from "../../img/sequence.svg";
import logout from "../../img/sign-out.svg";

type LeftBarProps = {
  activeBtn: number | null;
  setActiveBtn: (arg: number | null) => void;
};

export const LeftBar: FC<LeftBarProps> = ({ activeBtn, setActiveBtn }) => {
  return (
    <div className="left">
      <p className="logo">Logo</p>
      <div className="navigation">
        <div className="navigation_dashboard">
          <img src={dashboard} alt="" />
          <NavLink
            to="/dashboard"
            activeClassName="button_active"
            style={{ color: "#FFFFFF" }}
          >
            Dashboard
          </NavLink>
        </div>
        <div className="navigation_stuff">
          <img src={stuff} alt="" />
          <NavLink
            to="/stuff"
            activeClassName="button_active"
            style={{ color: "#FFFFFF" }}
          >
            Stuff
          </NavLink>
        </div>
        <div className="navigation_alerts">
          <img src={alerts} alt="" />
          <NavLink
            to="/alerts"
            activeClassName={"button_active"}
            style={{ color: "#FFFFFF" }}
          >
            Alerts
          </NavLink>
        </div>
        <div className="navigation_sequence">
          <img src={sequence} alt="" />
          <NavLink
            to="/sequence"
            activeClassName={"button_active"}
            style={{ color: "#FFFFFF" }}
          >
            Sequence
          </NavLink>
        </div>
      </div>
      <div className="sign-out">
        <img src={logout} alt="" />
        <button className="logout">Logout</button>
      </div>
    </div>
  );
};

export default LeftBar;
