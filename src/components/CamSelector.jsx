const CamSelector = ({ devices, deviceId, handleChange }) => {
  return (
    <select
      onChange={handleChange}
      value={deviceId}
      className="text-slate-300 dark:text-lime-300 absolute w-50 border-slite-600 border-solid border-1 rounded-md top-1 left-1 [text-shadow:3px_3px_5px_black]"
    >
      {devices.map((d, i) => (
        <option key={i} value={d.deviceId}>
          {`${i + 1}-${d.label.split("(")[0]}`}
        </option>
      ))}
    </select>
  );
};
export default CamSelector;
