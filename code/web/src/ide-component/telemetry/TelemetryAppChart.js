import moment from "moment";
import TelemetryChart from "./TelemetryChart";

/**
 * TelemetryAppChart Component
 * 
 * This component displays multiple telemetry charts using the TelemetryChart component.
 * It takes `appData` as input, extracts the required metrics, and plots charts for 
 * Response Time, Error Rate, Throughput, CPU Usage, and Memory Usage.
 * 
 * @param {Array} appData - Array of telemetry data with timestamps and various metrics.
 * @returns {JSX.Element} - A collection of telemetry charts.
 */
const TelemetryAppChart = ({ appData }) => {

  /**
   * Prepares data for the chart component.
   * 
   * @param {Array} data - Array of telemetry objects.
   * @param {string} field - The metric field name to extract.
   * @returns {Array} - Formatted data with time and metric values.
   */
  const prepareData = (data, field) => {
    return data.map((item) => ({
      time: moment(item.Timestamp).format("HH:mm"),
      metrics: item[field],
    }));
  };

  return (
    <div className="telemetry-chart-app">
      {/* Response Time Chart */}
      <div className="chart">
        <TelemetryChart
          data={prepareData(appData, "ResponseTime(ms)")}
          label="Response Time (ms)"
          xText="Time"
          yText="Response Time (ms)"
          lineColor="#F4A261"
        />
      </div>

      {/* Error Rate Chart */}
      <div className="chart">
        <TelemetryChart
          data={prepareData(appData, "ErrorRate(%)")}
          label="Error Rate (%)"
          xText="Time"
          yText="Error Rate (%)"
          lineColor="#E63946"
        />
      </div>

      {/* Throughput Chart */}
      <div className="chart">
        <TelemetryChart
          data={prepareData(appData, "Throughput(req/sec)")}
          label="Throughput (req/sec)"
          xText="Time"
          yText="Throughput (req/sec)"
          lineColor="#2A9D8F"
        />
      </div>

      {/* CPU Usage Chart */}
      <div className="chart">
        <TelemetryChart
          data={prepareData(appData, "CPUUsage(%)")}
          label="CPU Usage (%)"
          xText="Time"
          yText="CPU Usage (%)"
          lineColor="#E9C46A"
        />
      </div>

      {/* Memory Usage Chart */}
      <div className="chart">
        <TelemetryChart
          data={prepareData(appData, "MemoryUsage(MB)")}
          label="Memory Usage (MB)"
          xText="Time"
          yText="Memory Usage (MB)"
          lineColor="#264653"
        />
      </div>
    </div>
  );
};

export default TelemetryAppChart;
