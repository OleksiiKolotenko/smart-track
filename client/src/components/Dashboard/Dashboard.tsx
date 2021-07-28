import { useQuery } from "@apollo/client";
import React from "react";
import {
  GetDoctorsResponse,
  getDoctors,
} from "../../graphql/Dashboard/GetDoctors";
import "./Dashboard.scss";
import DashboardCard from "./DashboardCard";

export const Dashboard = () => {
  const { data, loading } = useQuery<GetDoctorsResponse>(getDoctors);

  return (
    <div className="dashboard">
      {data?.getDoctors &&
        data.getDoctors.map((dashboard, index) => (
          <DashboardCard
            name={dashboard.name}
            key={`dashboard_${index}`}
            rooms={dashboard.rooms}
          />
        ))}
    </div>
  );
};

export default Dashboard;
