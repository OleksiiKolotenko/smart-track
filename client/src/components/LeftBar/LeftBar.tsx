import React from "react";
import { Link } from "react-router-dom";
import "./LeftBar.scss";
import dashboard from "../../img/dashboard.svg";
import stuff from "../../img/stuff.svg";
import alerts from "../../img/alerts.svg";
import sequence from "../../img/sequence.svg";
import logout from "../../img/sign-out.svg";
import { FC } from "react";

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
          <Link to="/dashboard">
            <button
              onClick={() => setActiveBtn(0)}
              className={
                activeBtn === 0 ? "button_active" : "dashboard_content"
              }
            >
              Dashboard
            </button>
          </Link>
        </div>
        <div className="navigation_stuff">
          <img src={stuff} alt="" />
          <Link to="/stuff">
            <button
              onClick={() => setActiveBtn(1)}
              className={activeBtn === 1 ? "button_active" : "stuff_content"}
            >
              Stuff
            </button>
          </Link>
        </div>
        <div className="navigation_alerts">
          <img src={alerts} alt="" />
          <Link to="/alerts">
            <button
              onClick={() => setActiveBtn(2)}
              className={activeBtn === 2 ? "button_active" : "alerts_content"}
            >
              Alerts
            </button>
          </Link>
        </div>
        <div className="navigation_sequence">
          <img src={sequence} alt="" />
          <Link to="/sequence">
            <button
              onClick={() => setActiveBtn(3)}
              className={activeBtn === 3 ? "button_active" : "sequence_content"}
            >
              Sequence
            </button>
          </Link>
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
