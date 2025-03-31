const addSeconds = (timeString, secondsToAdd) => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const date = new Date(0, 0, 0, hours, minutes, seconds);
  date.setSeconds(date.getSeconds() + secondsToAdd);
  const updatedHours = String(date.getHours()).padStart(2, "0");
  const updatedMinutes = String(date.getMinutes()).padStart(2, "0");
  const updatedSeconds = String(date.getSeconds()).padStart(2, "0");
  return `${updatedHours}:${updatedMinutes}:${updatedSeconds}`;
};

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const datadata = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: Array.from({ length: labels.length }, () => Math.random()),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: Array.from({ length: labels.length }, () => Math.random()),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Timeline = ({ data }) => {
  console.log({ data });
  const time = [];
  const speeds = [];
  const persons = [];
  data.forEach((d) => {
    d.speeds.forEach((speed, index) => {
      time.push(addSeconds(d.start, index));
      speeds.push(speed);
      persons.push(d.detections[index]);
    });
  });
  console.log({ time, speeds, persons });
  return (
    <>
      <h3>Timeline</h3>
      <Line options={options} data={datadata} />
    </>
  );
};

export default Timeline;
