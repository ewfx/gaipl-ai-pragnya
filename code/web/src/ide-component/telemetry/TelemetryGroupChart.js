import React, { useEffect, useState } from "react"
import moment from "moment";
import './TelemetryGroupChart.css';
import TelemetryChart from "./TelemetryChart";
import TelementryAppChart from "./TelemetryAppChart";
import TelementryHostChart from "./TelemetryHostChart";

const TelemetryGroupChart = ({selectedIncident}) => {
    const [appData, setAppData] = useState(null);
    const [hostData, setHostData] = useState(null);

    useEffect(() => {
        if (selectedIncident === null) {
            return;
        }
        fetch("http://localhost:8000/telemetry", {
            method: "GET",
            mode: "cors",  // Ensures cross-origin request
            headers: {
            "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setAppData(data['appid']);
                setHostData(data['Host']);
        })
    },[selectedIncident])

     

      const groupByAppID = (data) => {
        const groupedData = data.reduce((acc, item) => {
            const { appid } = item;
            if (!acc[appid]) {
              acc[appid] = [];
            }
            acc[appid].push(item);
            return acc;
          }, {});
        return Object.keys(groupedData).map(appid => ({ [appid]: groupedData[appid] }));
      }

      const groupByHost = (data) => {
        const groupedData = data.reduce((acc, item) => {
            const { Host } = item;
            if (!acc[Host]) {
              acc[Host] = [];
            }
            acc[Host].push(item);
            return acc;
          }, {});
        return Object.keys(groupedData).map(appid => ({ [appid]: groupedData[appid] }));
      }

     

      return (
        appData && hostData ? (
          <div>
            <div className="telemetry-chart">
              
              <div className="telemetry-chart-container">
                <div className="telemetry-chart-header">
                    <h4 className="telemetry-chart-heading" style={{textAlign:'center'}}><b>Application Metrics</b></h4>
                </div>
                {
                    groupByAppID(appData).map((app, index) => {
                        const appname = Object.keys(app)[0];
                        const appData = app[appname]
                        return <React.Fragment key={appname || index}>
                            <div className="telemetry-chart-header">
                              <h4 className="telemetry-chart-heading"><b>{appname}</b></h4>
                            </div>
                            <TelementryAppChart appData={appData} />
                          </React.Fragment>
                    })
                }
                <hr />
                <div className="telemetry-chart-header">
                    <h4 className="telemetry-chart-heading" style={{textAlign:'center'}}><b>Infrastructure Metrics</b></h4>
                </div>
                {
                    groupByHost(hostData).map((app, index) => {
                        const hostname = Object.keys(app)[0];
                        const hostData = app[hostname]
                        return (                        <React.Fragment key={hostname || index}>
                            <div className="telemetry-chart-header">
                                <h4 className="telemetry-chart-heading"><b>{hostname}</b></h4>
                            </div>
                            <TelementryHostChart hostData={hostData}/>
                        </React.Fragment>)
                    })
                }
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )
      );
      
    }

export default TelemetryGroupChart;