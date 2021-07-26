import { useQuery } from "@apollo/client";
import React from "react";
import {
  GetByRole,
  GetByRoleResponse,
} from "../../graphql/Dashboard/GetDoctors";
import "./Dashboard.scss";
import DashboardCard from "./DashboardCard";

export const Dashboard = () => {
  const { data, loading } = useQuery<GetByRoleResponse>(GetByRole, {
    variables: { role: "Doctor" },
  });

  return (
    <div className="dashboard">
      {data?.getByRole &&
        data.getByRole.map((dashboard, index) => (
          <DashboardCard name={dashboard.name} key={`alert_${index}`} />
        ))}
    </div>
  );
};

export default Dashboard;
