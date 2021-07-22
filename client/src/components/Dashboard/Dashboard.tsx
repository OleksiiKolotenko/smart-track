import React from "react";
import "./Dashboard.scss";
import DashboardCard from "./DashboardCard";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
    </div>
  );
};

export default Dashboard;
