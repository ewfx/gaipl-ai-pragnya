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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TelemetryChart = ({data, label, title, xText, yText, lineColor}) => {
   
  const labels = data.map(item => item.time);
  const metricUsageData = data.map(item => item.metrics);
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
            maxRotation: 45, // Rotate up to 45 degrees
            minRotation: 45, // Ensure rotation
          }
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

  return <Line 
            data={chartData} 
            options={options} 
             />;
};



export default TelemetryChart;
