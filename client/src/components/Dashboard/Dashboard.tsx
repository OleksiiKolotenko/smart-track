import { useQuery } from "@apollo/client";
import React from "react";
import {
  GetAllAlerts,
  GetAllAlertsResponse,
} from "../../graphql/Alerts/GetAlerts";
import {
  GetDoctorsResponse,
  getDoctors,
} from "../../graphql/Dashboard/GetDoctors";
import "./Dashboard.scss";
import DashboardCard from "./DashboardCard";

export const Dashboard = () => {
  const { data: dataDoctors, loading: loadingDoctors } =
    useQuery<GetDoctorsResponse>(getDoctors);
  const { data: dataAlerts, loading: loadingAlerts } =
    useQuery<GetAllAlertsResponse>(GetAllAlerts);

  if (loadingAlerts) {
    return <span>Loading...</span>;
  }
  if (loadingDoctors) {
    return <span>Loading...</span>;
  }

  return (
    <div className="dashboard">
      {dataDoctors?.getDoctors &&
        dataDoctors.getDoctors.map((dashboard, index) => (
          <DashboardCard
            name={dashboard.name}
            alerts={dataAlerts}
            key={`dashboard_${index}`}
            rooms={dashboard.rooms}
          />
        ))}
    </div>
  );
};

export default Dashboard;
