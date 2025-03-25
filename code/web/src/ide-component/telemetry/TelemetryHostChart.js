import moment from "moment";
import TelemetryChart from "./TelemetryChart";

const TelementryHostChart = ({ hostData }) => {
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
        <div className="telemetry-chart-host">
                    <div className="chart">
                        <TelemetryChart 
                            data={prepreData(hostData, `Memory_Utilization(MB)`)}
                            label={`Memory_Utilization(MB)`}
                            xText={`Time`}
                            yText={`Memory_Utilization(MB)`}
                            lineColor={`#F4A261`}
                        />
                    </div>
                     <div className="chart">
                        <TelemetryChart 
                            data={prepreData(hostData, `Storage_Usage(GB)`)}
                            label={`Storage_Usage(GB)`}
                            xText={`Time`}
                            yText={`Storage_Usage(GB)`}
                            lineColor={`#E9C46A`}
                        />
                    </div>
                    <div className="chart">
                        <TelemetryChart 
                            data={prepreData(hostData, `IO_Reads(ops/sec)`)}
                            label={`IO_Reads(ops/sec)`}
                            xText={`Time`}
                            yText={`IO_Reads(ops/sec)`}
                            lineColor={`#2A9D8F`}
                        />
                    </div>
                    <div className="chart">
                        <TelemetryChart 
                            data={prepreData(hostData, `IO_Writes(ops/sec)`)}
                            label={`IO_Writes(ops/sec)`}
                            xText={`Time`}
                            yText={`IO_Writes(ops/sec)`}
                            lineColor={`#264653`}
                        />
                    </div>
                    <div className="chart">
                        <TelemetryChart 
                            data={prepreData(hostData, `CPU_Utilization(%)`)}
                            label={`CPU_Utilization(%)`}
                            xText={`Time`}
                            yText={`CPU_Utilization(%)`}
                            lineColor={`#E63946`}
                        />
                    </div>
                </div>
    )

}

export default TelementryHostChart;