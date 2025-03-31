const Indicator = ({ label, value, unit }) => (
  <div className="text-center">
    <p className="text-xs ">{label}</p>
    <h3 className="text-2xl ">{value?.toFixed(1) || "0.0"}</h3>
    <p className="text-xs ">{unit}</p>
  </div>
);

const GPS = ({ gps }) => {
  const { altitude, bearing, speed } = gps;

  return (
    <div className="flex gap-4">
      <Indicator label="Altitude" value={altitude} unit="ft ASL" />
      <Indicator label="Bearing" value={bearing} unit="degrees" />
      <Indicator label="Speed" value={speed * 2.23} unit="mph" />
    </div>
  );
};
export default GPS;
