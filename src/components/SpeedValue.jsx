const SpeedValue = ({ gps }) => {
  return (
    <div className="text-center text-slate-300 dark:text-lime-300  absolute  right-2 [text-shadow:3px_3px_5px_black]">
      <h3 className="text-3xl font-bold">{gps.speed?.toFixed(1) || "0.0"}</h3>
      <p className="mt-[-0.75em] ">mph</p>
    </div>
  );
};
export default SpeedValue;
