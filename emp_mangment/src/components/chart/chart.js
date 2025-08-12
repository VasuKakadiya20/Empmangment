import React from "react";
import Chart from "react-apexcharts";
import "./chart.css";

const ProjectSurvey = () => {
  const series = [
    {
      name: "Employee 1",
      type: "column",
      data: [30, 20, 30, 47, 30, 33, 21]
    },
    {
      name: "Employee 2",
      type: "area",
      data: [44, 55, 41, 67, 22, 43, 21]
    },
    {
      name: "Employee 3",
      type: "line",
      data: [30, 25, 36, 30, 45, 40, 30]
    }
  ];

  const options = {
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      toolbar: {
        show: true
      }
    },
    stroke: {
      width: [0, 2, 3],
      curve: "smooth"
    },
    plotOptions: {
      bar: {
        columnWidth: "35%"
      }
    },
    colors: ["#6c6c6c", "#9b87f5", "#f4a261"], 
    fill: {
      opacity: [1, 0.4, 1]
    },
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
    ],
    markers: {
      size: 0
    },
    xaxis: {
      type: "Month"
    },
    yaxis: {
      title: {
        text: "Revenue"
      }
    },
    tooltip: {
      shared: true,
      intersect: false
    },
    legend: {
      position: "top",
      horizontalAlign: "left"
    }
  };

  return (
    <div className="project-survey-card mt-5">
      <div className="header mt-5">
        <h4>Employee Performance</h4>
      </div>
      <Chart options={options} series={series} height={350} />
    </div>
  );
};

export default ProjectSurvey;
