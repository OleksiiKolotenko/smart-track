import { useQuery } from "@apollo/client";
import DashboardCard from "./DashboardCard";

import {
  GetAllAlerts,
  GetAllAlertsResponse,
} from "../../graphql/Alerts/GetAlerts";
import {
  GetDoctorsResponse,
  getDoctors,
} from "../../graphql/Dashboard/GetDoctors";
import "./Dashboard.scss";

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
        dataAlerts &&
        dataDoctors.getDoctors.map((dashboard, index) => (
          <DashboardCard
            name={dashboard.name}
            alerts={dataAlerts.getAlerts}
            key={`dashboard_${index}`}
            rooms={dashboard.rooms}
          />
        ))}
    </div>
  );
};

export default Dashboard;
