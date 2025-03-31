const SelectOptions = ({ label, options = [], ...props }) => {
  // options:
  // {value: value, name: "nam"}
  return (
    <div className="flex items-center gap-1">
      <label>{label} </label>
      <select
        className="border-slite-600 border-solid border-1 rounded-md py-1 dark:bg-lime-800 dark:text-lime-300 text-xs"
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOptions;
