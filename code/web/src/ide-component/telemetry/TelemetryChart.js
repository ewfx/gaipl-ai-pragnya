/**
 * TelemetryChart Component
 * 
 * This component renders a Line Chart using Chart.js to visualize telemetry data.
 * It supports customization for chart labels, axis titles, and line color.
 *
 * @param {Array} data - Array of objects with 'time' and 'metrics' properties.
 * @param {string} label - Label for the dataset.
 * @param {string} title - Title of the chart.
 * @param {string} xText - X-axis label.
 * @param {string} yText - Y-axis label.
 * @param {string} lineColor - Color of the line.
 */

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TelemetryChart = ({ data, label, title, xText, yText, lineColor }) => {
  // Extract time labels and metric values for the chart
  const labels = data.map((item) => item.time);
  const metricUsageData = data.map((item) => item.metrics);

  // Configure chart data
  const chartData = {
    labels,
    datasets: [
      {
        label: label,
        data: metricUsageData,
        borderColor: lineColor,
        backgroundColor: '#FFFFFF',
        tension: 0,
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Configure chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xText,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: yText,
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default TelemetryChart;
