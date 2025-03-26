import React, { useEffect, useState } from "react";
import './TelemetryGroupChart.css';
import TelemetryChart from "./TelemetryChart";
import TelemetryAppChart from "./TelemetryAppChart";
import TelemetryHostChart from "./TelemetryHostChart";

/**
 * Component to display telemetry charts for application and infrastructure metrics.
 * @param {Object} selectedIncident - The selected incident data.
 */
const TelemetryGroupChart = ({ selectedIncident }) => {
  const [appData, setAppData] = useState(null);
  const [hostData, setHostData] = useState(null);

  // Fetch telemetry data when a selected incident is available
  useEffect(() => {
    if (!selectedIncident) return;

    fetch("http://localhost:8000/telemetry", {
      method: "GET",
      mode: "cors", // Ensures cross-origin requests
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        setAppData(data['appid']);
        setHostData(data['Host']);
      })
      .catch(error => console.error("Error fetching telemetry data:", error));
  }, [selectedIncident]);

  /**
   * Groups data by application ID.
   * @param {Array} data - The telemetry data.
   * @returns {Array} Grouped data by app ID.
   */
  const groupByAppID = (data) => {
    const groupedData = data.reduce((acc, item) => {
      const { appid } = item;
      if (!acc[appid]) acc[appid] = [];
      acc[appid].push(item);
      return acc;
    }, {});
    return Object.keys(groupedData).map(appid => ({ [appid]: groupedData[appid] }));
  };

  /**
   * Groups data by host.
   * @param {Array} data - The telemetry data.
   * @returns {Array} Grouped data by host.
   */
  const groupByHost = (data) => {
    const groupedData = data.reduce((acc, item) => {
      const { Host } = item;
      if (!acc[Host]) acc[Host] = [];
      acc[Host].push(item);
      return acc;
    }, {});
    return Object.keys(groupedData).map(host => ({ [host]: groupedData[host] }));
  };

  return (
    appData && hostData ? (
      <div className="telemetry-chart">
        <div className="telemetry-chart-container">
          {/* Application Metrics Section */}
          <div className="telemetry-chart-header">
            <h4 className="telemetry-chart-heading" style={{ textAlign: 'center' }}><b>Application Metrics</b></h4>
          </div>
          {groupByAppID(appData).map((app, index) => {
            const appName = Object.keys(app)[0];
            const appMetrics = app[appName];
            return (
              <React.Fragment key={appName || index}>
                <div className="telemetry-chart-header">
                  <h4 className="telemetry-chart-heading"><b>{appName}</b></h4>
                </div>
                <TelemetryAppChart appData={appMetrics} />
              </React.Fragment>
            );
          })}

          <hr />

          {/* Infrastructure Metrics Section */}
          <div className="telemetry-chart-header">
            <h4 className="telemetry-chart-heading" style={{ textAlign: 'center' }}><b>Infrastructure Metrics</b></h4>
          </div>
          {groupByHost(hostData).map((host, index) => {
            const hostName = Object.keys(host)[0];
            const hostMetrics = host[hostName];
            return (
              <React.Fragment key={hostName || index}>
                <div className="telemetry-chart-header">
                  <h4 className="telemetry-chart-heading"><b>{hostName}</b></h4>
                </div>
                <TelemetryHostChart hostData={hostMetrics} />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    )
  );
};

export default TelemetryGroupChart;
