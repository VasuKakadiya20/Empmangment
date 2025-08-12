import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./chart2.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EmployeeCharts = () => {
  const employeeGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep"],
    datasets: [
      {
        label: "New Employees",
        data: [28,35,38,40,35,42,35,40,50],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Existing Employees",
        data: [35,40,32,35,40,36,45,50,60],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
  };

  const employeeTasksData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep"],
    datasets: [
      {
        label: "Completed Tasks",
        data: [35, 45, 30, 55, 30, 35,40,30,40],
        backgroundColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "In Progress",
        data: [15, 20, 22, 20, 25, 20,12,15,20],
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "Pending Tasks",
        data: [10, 15, 15, 10, 15, 18, 7,9,10],
        backgroundColor: "rgba(54, 162, 235, 1)",
      },
      
      {
        label: "On Hold",
        data: [5,3,7,6,2,7,4,6,3],
        backgroundColor: "rgba(255, 206, 86, 1)",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: { beginAtZero: true, max: 120 },
    },
  };

  return (
  
    <div className="charts-container">
      <div className="chart-card">
        <div className="chart-header">
          <h3>Employee Growth Survey</h3>
        </div>
        <Line data={employeeGrowthData} options={lineOptions} />
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <h3>Employee Task Survey</h3>
        </div>
        <Bar data={employeeTasksData} options={barOptions} />
      </div>
    </div>
   
  );
};

export default EmployeeCharts;
