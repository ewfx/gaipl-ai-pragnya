import moment from "moment";
import TelemetryChart from "./TelemetryChart";

/**
 * Component to render telemetry host metrics using multiple line charts.
 * 
 * @param {Object} props - Component properties.
 * @param {Array} props.hostData - Array of host telemetry data.
 */
const TelementryHostChart = ({ hostData }) => {
  /**
   * Prepares data for rendering in the chart.
   *
   * @param {Array} data - Array of telemetry data.
   * @param {string} fields - The field name representing the metric.
   * @returns {Array} Formatted data with time and metric value.
   */
  const prepareData = (data, fields) => {
    return data.map((item) => ({
      time: moment(item.Timestamp).format("HH:mm"),
      metrics: item[fields],
    }));
  };

  return (
    <div className="telemetry-chart-host">
      {/* Memory Utilization Chart */}
      <div className="chart">
        <TelemetryChart 
          data={prepareData(hostData, `Memory_Utilization(MB)`)}
          label={`Memory Utilization (MB)`}
          xText={`Time`}
          yText={`Memory Utilization (MB)`}
          lineColor={`#F4A261`}
        />
      </div>

      {/* Storage Usage Chart */}
      <div className="chart">
        <TelemetryChart 
          data={prepareData(hostData, `Storage_Usage(GB)`)}
          label={`Storage Usage (GB)`}
          xText={`Time`}
          yText={`Storage Usage (GB)`}
          lineColor={`#E9C46A`}
        />
      </div>

      {/* IO Reads Chart */}
      <div className="chart">
        <TelemetryChart 
          data={prepareData(hostData, `IO_Reads(ops/sec)`)}
          label={`IO Reads (ops/sec)`}
          xText={`Time`}
          yText={`IO Reads (ops/sec)`}
          lineColor={`#2A9D8F`}
        />
      </div>

      {/* IO Writes Chart */}
      <div className="chart">
        <TelemetryChart 
          data={prepareData(hostData, `IO_Writes(ops/sec)`)}
          label={`IO Writes (ops/sec)`}
          xText={`Time`}
          yText={`IO Writes (ops/sec)`}
          lineColor={`#264653`}
        />
      </div>

      {/* CPU Utilization Chart */}
      <div className="chart">
        <TelemetryChart 
          data={prepareData(hostData, `CPU_Utilization(%)`)}
          label={`CPU Utilization (%)`}
          xText={`Time`}
          yText={`CPU Utilization (%)`}
          lineColor={`#E63946`}
        />
      </div>
    </div>
  );
};

export default TelementryHostChart;
