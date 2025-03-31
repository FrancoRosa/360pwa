import { useEffect, useState } from "react";
import Cam from "./components/CamDetection";
import Config from "./components/Config";
import useLocal from "./js/storage";
import Navigation from "./components/Navigation";
import { io } from "socket.io-client";
import { addEvent } from "./js/inDB";
import SpeedChart from "./components/SpeedChart";
import { Disc } from "lucide-react";
import {
  generateFilename,
  keep,
  stop,
  start as startRecord,
} from "./js/record";
import PWABadge from "./PWABadge.jsx";

function App() {
  const resolution = {
    width: 1280,
    height: 720,
    // width: 640,
    // height: 480,
  };
  const [page, setPage] = useState("main"); //main, config, reports
  const [config, setConfig] = useLocal("config", {
    beep: true,
    detection: true,
  });
  const [gps, setGPS] = useState({});
  const [lines, setLines] = useLocal("lines", {
    vt1: resolution.width / 4,
    vt2: (3 * resolution.width) / 4,
    ht: resolution.height / 4,
    vb1: resolution.width / 4,
    vb2: (3 * resolution.width) / 4,
    hb: (3 * resolution.height) / 4,
  });
  const [recording, setRecording] = useState(false);
  const [person, setPerson] = useState(false);
  let start = new Date();
  let counter = 0;
  let activeCount = 0;
  let running = false;
  const minSpeed = 2;
  const minCount = 5;
  let speeds = [];
  let detections = [];
  let webLocation = false;
  let locationInterval;

  useEffect(() => {
    const socket = io("http://localhost:8080");
    const handleData = (data) => {
      const { speed, person, latitude, longitude } = data;
      if (speed !== null) {
        setGPS(data);

        if (speed >= minSpeed) {
          keep();
          counter = 0;
          if (!running) {
            start = new Date();
            speeds = [];
            detections = [];
            running = true;
            console.log("... start");
            setRecording(true);
            startRecord(generateFilename());
          }
        }

        if (speed < minSpeed && running) {
          counter++;
          if (counter > minCount) {
            running = false;
            const end = new Date();
            console.log("... end");
            setRecording(false);
            stop();
            addEvent({
              date: start.toLocaleDateString("sv"),
              start: start.toLocaleTimeString("sv"),
              end: end.toLocaleTimeString("sv"),
              speeds,
              detections,
            });
          }
        }

        if (running) {
          speeds.push(speed);
          detections.push(person);
        }
      }
    };

    socket.on("gpsData", (data) => {
      handleData(data);
    });

    socket.on("connect_error", (err) => {
      if (webLocation == false) {
        locationInterval = setInterval(() => {
          navigator.geolocation.getCurrentPosition((position) => {
            handleData(position.coords);
          });
          console.log("web location");
        }, 1000);
        webLocation = true;
      }
    });

    return () => {
      socket.off("gpsData");
      socket.off("connect_error");
      socket.disconnect();
      clearInterval(locationInterval);
    };
  }, []);
  return (
    <>
      <div className=" text-slate-900 bg-slate-400 dark:text-lime-400 dark:bg-slate-900 text-sm flex flex-col  items-center h-screen">
        <Navigation {...{ page, setPage }} />

        {page === "config" && (
          <Config {...{ resolution, config, setConfig, lines, setLines }} />
        )}

        {page == "reports" ? (
          <SpeedChart />
        ) : (
          <>
            <Cam
              {...{
                resolution,
                lines,
                page,
                config,
                setPerson,
                gps,
              }}
            />
            {recording && (
              <Disc className="absolute bottom-0 w-3  p-0 m-0 text-red-600" />
            )}
          </>
        )}
      </div>
      <PWABadge />
    </>
  );
}

export default App;
