import React, { useState } from "react";
import AlertsBlock from "./AlertsBlock";
import {
  GetAllAlerts,
  GetAllAlertsResponse,
} from "../../graphql/Alerts/GetAlerts";
import { useQuery } from "@apollo/client";

import "./Alerts.scss";

export const Alerts = () => {
  const { data, loading } = useQuery<GetAllAlertsResponse>(GetAllAlerts);
  console.log(data?.getAlerts);
  return (
    <div className="alerts">
      <button className="add">Add new</button>
      <div className="alerts_box">
        {data?.getAlerts &&
          data.getAlerts.map((e) => (
            <AlertsBlock number={e.number} status={e.status} color={e.color} />
          ))}
      </div>
    </div>
  );
};

export default Alerts;
