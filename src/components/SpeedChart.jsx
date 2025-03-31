import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-date-fns";
import { getDayEvents } from "../js/inDB";

Chart.register(...registerables, zoomPlugin);

// Function to convert time strings into Date objects
const parseTime = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return new Date(2023, 0, 1, hours, minutes, seconds);
};

const addSeconds = (timeString, secondsToAdd) => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const date = new Date(0, 0, 0, hours, minutes, seconds);
  date.setSeconds(date.getSeconds() + secondsToAdd);
  const updatedHours = String(date.getHours()).padStart(2, "0");
  const updatedMinutes = String(date.getMinutes()).padStart(2, "0");
  const updatedSeconds = String(date.getSeconds()).padStart(2, "0");
  return `${updatedHours}:${updatedMinutes}:${updatedSeconds}`;
};

const initOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "time",
      time: {
        unit: "hour",
        tooltipFormat: "HH:mm:ss",
        displayFormats: {
          hour: "HH:mm",
          minute: "HH:mm",
          second: "HH:mm:ss",
        },
      },
      min: new Date(2023, 0, 1, 0, 0, 0),
      max: new Date(2023, 0, 1, 23, 59, 59),
    },
    y: {
      title: {
        display: true,
        text: "Speed (m/s)",
      },
      suggestedMin: 0, // Optional: Keeps Y-axis stable
      suggestedMax: 10,
    },
  },
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        mode: "x",
        scaleMode: "x",
      },
      zoom: {
        wheel: {
          enabled: true,
          scaleMode: "x",
        },
        pinch: {
          enabled: true,
          scaleMode: "x",
        },
        mode: "x",
        onZoom: ({ chart }) => {
          console.log(chart);
          const { min, max } = chart.scales.x;
          const diff = max - min;

          if (diff <= 1000 * 60 * 60) {
            //chart.scales.x._unit = "minute"; // Show minutes if zoomed in under 1 hour
            const tempOptions = { ...options };
            tempOptions.scales.x.time.unit = "minute";
            setOptions(tempOptions);
            console.log("minute");
          } else if (diff <= 1000 * 60 * 5) {
            console.log("second");
            const tempOptions = { ...options };
            tempOptions.scales.x.time.unit = "seconds";
            setOptions(tempOptions);
            //chart.scales.x._unit = "second"; // Show seconds if zoomed in under 5 minutes
          } else {
            console.log("hour");
            const tempOptions = { ...options };
            tempOptions.scales.x.time.unit = "hours";
            setOptions(tempOptions);
            //chart.scales.x._unit = "hour"; // Default to hour
          }
        },
      },
    },
  },
};

const SpeedChart = () => {
  const [data, setData] = useState({
    labels: [], // Convert time to Date objects
    datasets: [],
  });

  const [options, setOptions] = useState(initOptions);

  useEffect(() => {
    let time = [];
    let speeds = [];
    let persons = [];
    const today = new Date().toLocaleDateString("sv");
    const dataStored = getDayEvents(today);

    dataStored.forEach((d) => {
      d.speeds.forEach((speed, index) => {
        time.push(addSeconds(d.start, index));
        speeds.push(speed);
        persons.push(d.detections[index]);
      });
      time.push(addSeconds(d.start, d.speeds.length));
      speeds.push(null);
      persons.push(null);
    });

    const chartData = {
      labels: time.map(parseTime), // Convert time to Date objects

      datasets: [
        {
          label: "Speed (m/s)",
          data: speeds,
          borderColor: "blue",
          backgroundColor: "rgba(0, 0, 255, 0.2)",
          fill: true,
          tension: 0.3, // Smooth line
          spanGaps: false,
        },
        {
          label: "Detection",
          data: persons,
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          fill: true,
          tension: 0.3, // Smooth line
          spanGaps: false,
        },
      ],
    };
    setData(chartData);
  }, []);

  return (
    <div className="w-full h-96">
      <Line data={data} options={options} />
    </div>
  );
};

export default SpeedChart;
