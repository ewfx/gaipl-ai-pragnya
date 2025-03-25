import moment from "moment";
import TelemetryChart from "./TelemetryChart";

const TelementryAppChart = ({ appData }) => {

     const prepreData = (data, fields)=>{
                const result = data.map((item)=>{
                    return {
                        'time': moment(item.Timestamp).format("HH:mm"),
                        'metrics': item[fields]
                    }
                });
                return result;
          }
    return (
        <div className="telemetry-chart-app">
                  <div className="chart">
                    <TelemetryChart
                        data={prepreData(appData, `ResponseTime(ms)`)}
                        label={`Response Time (ms)`}
                        xText={`Time`}
                        yText={`Response Time (ms)`}
                        lineColor={`#F4A261`}
                    />
                  </div>
                  <div className="chart">
                    <TelemetryChart 
                        data={prepreData(appData, `ErrorRate(%)`)}
                        label={`ErrorRate(%)`}
                        xText={`Time`}
                        yText={`ErrorRate(%)`}
                        lineColor={`#E63946`}
                    />
                  </div>
                  <div className="chart">
                    <TelemetryChart 
                        data={prepreData(appData, `Throughput(req/sec)`)}
                        label={`Throughput(req/sec)`}
                        xText={`Time`}
                        yText={`Throughput(req/sec)`}
                        lineColor={`#2A9D8F`}
                    />
                  </div>
                  <div className="chart">
                    <TelemetryChart 
                        data={prepreData(appData, `CPUUsage(%)`)}
                        label={`CPUUsage(%)`}
                        xText={`Time`}
                        yText={`CPUUsage(%)`}
                        lineColor={`#E9C46A`}
                    />
                  </div>
                  <div className="chart">
                    <TelemetryChart 
                        data={prepreData(appData, `MemoryUsage(MB)`)}
                        label={`MemoryUsage(MB)`}
                        xText={`Time`}
                        yText={`MemoryUsage(MB)`}
                        lineColor={`#264653`}
                    />
                  </div>
                </div>
    )
}

export default TelementryAppChart;